"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80";

// 1. Asli Component jahan useParams use hua hai
function ProductContent() {
  const params = useParams();
  const id = params?.id as string;
  
  const [product, setProduct] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>(DEFAULT_IMAGE);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      try {
        const { data: productData } = await supabase.from("products").select("*").eq("id", id);
        const { data: galleryData } = await supabase.from("product_images").select("image_url").eq("product_id", id);

        if (productData && productData.length > 0) {
          const p = productData[0];
          setProduct(p);

          let galleryUrls = galleryData ? galleryData.map((img: any) => img.image_url) : [];
          if (p.image && p.image.startsWith("http") && !galleryUrls.includes(p.image)) {
            galleryUrls = [p.image, ...galleryUrls];
          }
          if (galleryUrls.length === 0) galleryUrls = [DEFAULT_IMAGE];

          setImages(galleryUrls);
          setMainImage(galleryUrls[0]);
          setCurrentImageIndex(0);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchProductDetails();
  }, [id]);

  const nextImage = () => {
    if (images.length > 0) {
      const nextIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(nextIndex);
      setMainImage(images[nextIndex]);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
      setCurrentImageIndex(prevIndex);
      setMainImage(images[prevIndex]);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    const existingCart = JSON.parse(localStorage.getItem("rosco_cart") || "[]");
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id);
    
    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].qty += 1;
    } else {
      existingCart.push({ id: product.id, name: product.name, price: product.price, image: mainImage, qty: 1 });
    }
    
    localStorage.setItem("rosco_cart", JSON.stringify(existingCart));
    alert("Product Cart Mein Add Ho Gaya! 🛒");
  };

  if (loading) return <div className="min-h-screen bg-[#faf6f0] flex items-center justify-center text-2xl font-serif">Loading Details...</div>;
  
  if (!product) return (
    <div className="min-h-screen bg-[#faf6f0] flex flex-col items-center justify-center">
      <p className="text-2xl text-red-600 mb-4">Yeh product database mein nahi mila!</p>
      <Link href="/shop" className="bg-[#1a120c] text-white px-6 py-2 rounded">Back to Shop</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1a120c]">
      <nav className="bg-[#2a1d13] text-[#faf6f0] py-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-[0.2em] font-serif text-white">ROSCO<span className="text-[#c9a35a]"> EXPORT</span></Link>
          <div className="flex gap-6 items-center">
            <Link href="/cart" className="text-xs uppercase tracking-widest hover:text-[#c9a35a]">🛍️ Cart</Link>
            <Link href="/shop" className="text-xs uppercase tracking-widest hover:text-[#c9a35a]">← Back</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/2">
          <div className="relative bg-white border border-gray-200 shadow-sm p-4 mb-4 group">
            <img src={mainImage} alt={product.name} className="w-full h-[500px] object-contain" />
            {images.length > 1 && (
              <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-[#c9a35a] w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
              </button>
            )}
            {images.length > 1 && (
              <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-[#c9a35a] w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              </button>
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-3">
              {images.map((img, index) => (
                <div key={index} onClick={() => {setMainImage(img); setCurrentImageIndex(index);}} className={`cursor-pointer border-2 ${mainImage === img ? 'border-[#c9a35a]' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-20 object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <p className="text-[#c9a35a] text-sm tracking-widest uppercase mb-2">{product.category}</p>
          <h1 className="text-4xl font-serif mb-4">{product.name}</h1>
          <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-6">
            <span className="text-3xl font-bold">${Number(product.price).toFixed(2)}</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-8">Crafted from 100% genuine full-grain leather. Premium quality.</p>
          <button onClick={handleAddToCart} className="w-full bg-[#1a120c] text-white py-4 text-sm font-bold tracking-widest hover:bg-[#c9a35a] transition">ADD TO CART</button>
        </div>
      </div>
    </div>
  );
}

// 2. Main Page jo ProductContent ko Suspense mein wrap karta hai
export default function ProductDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-2xl">Loading...</div>}>
      <ProductContent />
    </Suspense>
  );
}