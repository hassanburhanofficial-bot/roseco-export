"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.supabaseurl!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function CustomOrdersPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    company_name: "",
    email: "",
    country: "",
    product_interest: "Leather Jackets",
    quantity: "",
    requirements: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("inquiries").insert([formData]);
      if (error) throw error;

      alert("Inquiry Sent Successfully! Hamari team jald aapse raabta karegi. 🤝");
      setFormData({
        full_name: "",
        company_name: "",
        email: "",
        country: "",
        product_interest: "Leather Jackets",
        quantity: "",
        requirements: "",
      });
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1a120c]">
      {/* Navbar */}
      <nav className="bg-[#2a1d13] text-[#faf6f0] py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-[0.2em] font-serif text-white">
            ROSCO<span className="text-[#c9a35a]"> EXPORT</span>
          </Link>
          <Link href="/shop" className="text-xs uppercase tracking-widest hover:text-[#c9a35a] transition">
            Shop Collection
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-[#1a120c] text-white py-24 text-center px-4 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif mb-6">YOUR DESIGN.<br/>OUR CRAFTSMANSHIP.</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We manufacture premium leather goods for international brands. Private label, OEM, and bulk orders.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-12">
        
        {/* Left Side: Info */}
        <div className="w-full md:w-1/3">
          <h2 className="text-2xl font-serif mb-6 border-b border-gray-300 pb-4">What We Offer</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-[#c9a35a] text-xl">✓</span> 
              <div><strong>Custom Manufacturing:</strong> Made to your exact specifications.</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a35a] text-xl">✓</span> 
              <div><strong>Bulk Orders:</strong> Volume pricing and reliable lead times.</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a35a] text-xl">✓</span> 
              <div><strong>Private Labeling:</strong> Your brand, our craftsmanship.</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a35a] text-xl">✓</span> 
              <div><strong>OEM Manufacturing:</strong> Full production support.</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a35a] text-xl">✓</span> 
              <div><strong>Custom Sizes & Colors:</strong> Tailored to your needs.</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#c9a35a] text-xl">✓</span> 
              <div><strong>International Wholesale:</strong> Export documentation included.</div>
            </li>
          </ul>

          <div className="mt-10 bg-[#f4ebd9] p-6 border-l-4 border-[#c9a35a]">
            <h3 className="font-bold mb-2 text-lg">Need to talk directly?</h3>
            <p className="text-sm text-gray-600 mb-4">Contact our export team on WhatsApp.</p>
            {/* Asli WhatsApp Number Yahan Laga Hai */}
            <a 
              href="https://wa.me/923437100232" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block bg-[#25D366] text-white px-6 py-3 rounded font-bold hover:bg-[#1ebd5a] transition w-full text-center"
            >
              WhatsApp Inquiry (+92 343 7100232)
            </a>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-2/3">
          <div className="bg-white p-8 border border-gray-200 shadow-lg">
            <h2 className="text-3xl font-serif mb-6">Send Wholesale Inquiry</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="w-full">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
                  <input type="text" required value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#c9a35a]" />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Company Name</label>
                  <input type="text" value={formData.company_name} onChange={(e) => setFormData({...formData, company_name: e.target.value})} className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#c9a35a]" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <div className="w-full">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email Address *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#c9a35a]" />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Country *</label>
                  <input type="text" required value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#c9a35a]" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <div className="w-full">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Product Interested In</label>
                  <select value={formData.product_interest} onChange={(e) => setFormData({...formData, product_interest: e.target.value})} className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#c9a35a]">
                    <option value="Leather Jackets">Leather Jackets</option>
                    <option value="Leather Wallets">Leather Wallets</option>
                    <option value="Leather Bags">Leather Bags</option>
                    <option value="Leather Gloves">Leather Gloves</option>
                    <option value="Leather Belts">Leather Belts</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Estimated Quantity</label>
                  <input type="text" placeholder="e.g. 500 pieces" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#c9a35a]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Custom Requirements</label>
                <textarea rows={4} value={formData.requirements} onChange={(e) => setFormData({...formData, requirements: e.target.value})} className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#c9a35a]" placeholder="Tell us about your design, sizes, colors, etc."></textarea>
              </div>

              <button type="submit" disabled={loading} className="bg-[#1a120c] text-white font-bold py-4 mt-2 tracking-widest hover:bg-[#c9a35a] hover:text-[#1a120c] transition disabled:opacity-50 text-lg">
                {loading ? "SENDING..." : "SEND INQUIRY"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Our Process Section */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-10">How We Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 border border-gray-100 shadow-sm">
              <div className="text-3xl font-serif text-[#c9a35a] mb-4">01</div>
              <h3 className="font-bold mb-2">Inquiry</h3>
              <p className="text-sm text-gray-600">Send us your design, requirements, and quantity.</p>
            </div>
            <div className="p-6 border border-gray-100 shadow-sm">
              <div className="text-3xl font-serif text-[#c9a35a] mb-4">02</div>
              <h3 className="font-bold mb-2">Sampling</h3>
              <p className="text-sm text-gray-600">We create samples for your approval.</p>
            </div>
            <div className="p-6 border border-gray-100 shadow-sm">
              <div className="text-3xl font-serif text-[#c9a35a] mb-4">03</div>
              <h3 className="font-bold mb-2">Production</h3>
              <p className="text-sm text-gray-600">Bulk manufacturing with strict quality control.</p>
            </div>
            <div className="p-6 border border-gray-100 shadow-sm">
              <div className="text-3xl font-serif text-[#c9a35a] mb-4">04</div>
              <h3 className="font-bold mb-2">Shipping</h3>
              <p className="text-sm text-gray-600">We handle export documentation and delivery.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}