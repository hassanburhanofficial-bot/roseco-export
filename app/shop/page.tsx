"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  
  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Har page par 12 items

  useEffect(() => {
    const fetchProducts = async () => {
      const { data: productsData } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      const { data: imagesData } = await supabase.from("product_images").select("*");

      if (productsData) {
        const finalList = productsData.map((product) => {
          const productGallery = imagesData?.filter((img) => img.product_id === product.id) || [];
          let displayImg = productGallery.length > 0 ? productGallery[0].image_url : (product.image || DEFAULT_IMAGE);
          return { ...product, finalImage: displayImg };
        });
        setProducts(finalList);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Filter Logic
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  // --- PAGINATION LOGIC ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setCurrentPage(1); 
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1a120c]">
      {/* Navbar */}
      <nav className="bg-[#2a1d13] text-[#faf6f0] py-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-[0.2em] font-serif text-white">
            ROSCO<span className="text-[#c9a35a]"> EXPORT</span>
          </Link>
          <div className="hidden md:flex gap-6 text-xs uppercase tracking-widest">
            <Link href="/" className="hover:text-[#c9a35a] transition">Home</Link>
            <Link href="/shop" className="text-[#c9a35a]">Shop All</Link>
            <Link href="/custom-orders" className="hover:text-[#c9a35a] transition">Custom Orders</Link>
          </div>
          <div className="flex gap-4 text-lg">
            <Link href="/cart" className="hover:text-[#c9a35a] transition">🛍️</Link>
          </div>
        </div>
      </nav>

      {/* Premium Header */}
      <div className="bg-[#1a120c] text-[#faf6f0] py-20 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif mb-4 tracking-wide text-[#faf6f0]">The Collection</h1>
          <p className="text-[#c9a35a] text-sm tracking-[0.3em] uppercase">Premium Leather Goods</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-16 flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white p-8 border border-gray-200 shadow-lg rounded-sm sticky top-24">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-gray-200 pb-4 text-[#1a120c]">Categories</h3>
            <div className="flex flex-col gap-4">
              {["All", "Jackets", "Wallets", "Bags", "Shoes", "Accessories"].map((cat) => (
                <label key={cat} className="flex items-center text-sm cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category" 
                    checked={category === cat}
                    onChange={() => handleCategoryChange(cat)}
                    className="mr-3 w-4 h-4 accent-[#c9a35a] cursor-pointer" 
                  />
                  <span className={`group-hover:text-[#c9a35a] transition ${category === cat ? 'font-bold text-[#c9a35a]' : 'text-gray-600'}`}>
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Products Area */}
        <main className="flex-grow">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b border-gray-300 pb-6">
            <div className="w-full md:w-1/2 relative">
              <input 
                type="text" 
                placeholder="Search collection..." 
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full p-4 pl-12 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#c9a35a] text-sm shadow-sm"
              />
              <span className="absolute left-4 top-4 text-gray-400">🔍</span>
            </div>
            <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">Showing {filteredProducts.length} Items</p>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="text-center py-32 text-xl font-serif text-gray-500 animate-pulse">Loading Collection...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                {currentItems.map((product) => (
                  <Link href={`/shop/${product.id}`} key={product.id} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#f0f0f0] mb-6 rounded-sm shadow-sm">
                      <img 
                        src={product.finalImage} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button className="bg-white text-[#1a120c] px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#c9a35a] hover:text-white transition translate-y-4 group-hover:translate-y-0 duration-300 shadow-xl">
                          View Details
                        </button>
                      </div>
                      <span className="absolute top-4 left-4 bg-[#c9a35a] text-[#1a120c] text-xs font-bold px-3 py-1 shadow-sm">-15%</span>
                    </div>
                    <div className="text-center px-2">
                      <p className="text-[10px] text-gray-500 tracking-widest uppercase mb-2">{product.category || "Premium"}</p>
                      <h4 className="text-lg font-serif mb-2 group-hover:text-[#c9a35a] transition-colors">{product.name}</h4>
                      <p className="text-[#1a120c] font-bold text-lg">${Number(product.price).toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination Controls - Always Visible if products exist */}
              {filteredProducts.length > 0 && (
                <div className="flex justify-center items-center gap-2 mt-16 border-t border-gray-300 pt-8">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 text-sm disabled:opacity-50 hover:bg-gray-100 transition"
                  >
                    Prev
                  </button>
                  
                  {/* Agar totalPages 1 hai (yani 12 se kam products hain), toh bhi Page 1 dikhao */}
                  {Array.from({ length: Math.max(totalPages, 1) }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 border text-sm transition ${currentPage === page ? 'bg-[#c9a35a] text-[#1a120c] border-[#c9a35a] font-bold' : 'border-gray-300 hover:bg-gray-100'}`}
                    >
                      {page}
                    </button>
                  ))}

                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.max(totalPages, 1)))}
                    disabled={currentPage === Math.max(totalPages, 1)}
                    className="px-4 py-2 border border-gray-300 text-sm disabled:opacity-50 hover:bg-gray-100 transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}