"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function AdminPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Jackets",
  });
  
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imageFiles.length === 0) return alert("Please select at least one image!");
    
    setLoading(true);

    try {
      // 1. Product save karo (Image khali chhore kar)
      const { data: productData, error: dbError } = await supabase
        .from("products")
        .insert([
          {
            name: formData.name,
            price: parseFloat(formData.price),
            category: formData.category,
            image: "", 
          },
        ])
        .select();

      if (dbError) throw dbError;
      const productId = productData[0].id;

      // 2. Images upload karo
      let firstImageUrl = "";

      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${i}.${fileExt}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        // Pehli image ko main image banane ke liye save karo
        if (i === 0) {
          firstImageUrl = publicUrl;
        }

        // Har image ko product_images table mein save karo
        const { error: imgDbError } = await supabase.from("product_images").insert([
          { product_id: productId, image_url: publicUrl }
        ]);
        
        if (imgDbError) throw imgDbError;
      }

      // 3. Main Image ka link products table mein update karo
if (firstImageUrl) {
  const { data: updatedData, error: updateError } = await supabase
    .from("products")
    .update({ image: firstImageUrl })
    .eq("id", productId)
    .select(); // <-- Yeh line update ko confirm karegi
  
  if (updateError) {
    console.error("Update Error:", updateError);
    throw updateError;
  }
  
  // Console mein check karein ke update hua ya nahi
  console.log("Updated Product Data:", updatedData);
}
      alert("Product & Images Uploaded Successfully! 🎉");
      setFormData({ name: "", price: "", category: "Jackets" });
      setImageFiles([]);
      
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans flex">
      <aside className="w-64 bg-[#141414] border-r border-gray-800 p-6 flex flex-col">
        <h2 className="text-xl font-bold tracking-widest text-[#c9a35a] mb-10">ROSCO ADMIN</h2>
        <nav className="flex flex-col gap-4 text-sm">
          <Link href="/admin" className="bg-[#c9a35a] text-[#0a0a0a] px-4 py-2 font-bold rounded-sm">Dashboard</Link>
          <Link href="/" className="hover:text-[#c9a35a] px-4 py-2 transition">View Website</Link>
        </nav>
      </aside>

      <main className="flex-grow p-10">
        <h1 className="text-3xl font-serif mb-8 border-b border-gray-800 pb-4">Product Management</h1>

        <div className="bg-[#141414] p-8 rounded-md border border-gray-800 max-w-2xl">
          <h2 className="text-xl font-bold mb-6 text-[#c9a35a]">Add New Product</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Product Name</label>
              <input 
                type="text" required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#0a0a0a] border border-gray-700 p-3 rounded-sm focus:outline-none focus:border-[#c9a35a]"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-1">Price ($)</label>
                <input 
                  type="number" required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-gray-700 p-3 rounded-sm focus:outline-none focus:border-[#c9a35a]"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-1">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-gray-700 p-3 rounded-sm focus:outline-none focus:border-[#c9a35a]"
                >
                  <option value="Jackets">Jackets</option>
                  <option value="Wallets">Wallets</option>
                  <option value="Bags">Bags</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Product Images (Select Multiple)</label>
              <input 
                type="file" 
                accept="image/*"
                multiple
                required
                onChange={handleFileChange}
                className="w-full bg-[#0a0a0a] border border-gray-700 p-2 rounded-sm focus:outline-none focus:border-[#c9a35a] file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-[#c9a35a] file:text-[#0a0a0a] hover:file:bg-[#b8933f]"
              />
              {imageFiles.length > 0 && (
                <p className="text-sm text-[#c9a35a] mt-2">{imageFiles.length} images selected</p>
              )}
            </div>

            <button type="submit" disabled={loading} className="bg-[#c9a35a] text-[#0a0a0a] font-bold py-3 mt-4 rounded-sm hover:bg-[#b8933f] transition disabled:opacity-50">
              {loading ? "Uploading..." : "+ ADD PRODUCT"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}