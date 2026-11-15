"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

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

      <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-16">
        
        {/* Left Side: Contact Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Get In Touch</h1>
          <p className="text-gray-600 mb-10 text-lg">
            Have a question about our products, custom orders, or international shipping? Reach out to us.
          </p>
          
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-sm tracking-widest uppercase text-[#c9a35a] mb-2">Email Us</h3>
              <p className="text-xl">sales@roscoexport.com</p>
            </div>
            
            <div>
              <h3 className="font-bold text-sm tracking-widest uppercase text-[#c9a35a] mb-2">WhatsApp / Call</h3>
              <p className="text-xl mb-4">+92 343 7100232</p>
              {/* Asli WhatsApp Link */}
              <a 
                href="https://wa.me/923437100232" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded font-bold hover:bg-[#1ebd5a] transition"
              >
                <span>💬</span> Chat on WhatsApp
              </a>
            </div>

            <div>
              <h3 className="font-bold text-sm tracking-widest uppercase text-[#c9a35a] mb-2">Location</h3>
              <p className="text-xl">Sialkot, Pakistan</p>
              <p className="text-gray-500 text-sm mt-1">Global Export Hub</p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="w-full md:w-1/2 bg-white p-8 border border-gray-200 shadow-lg">
          <h2 className="text-2xl font-serif mb-6">Send a Message</h2>
          <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); alert("Message Sent Successfully!"); }}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
              <input type="text" required className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#c9a35a]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
              <input type="email" required className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#c9a35a]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Message</label>
              <textarea rows={5} required className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#c9a35a]"></textarea>
            </div>
            <button type="submit" className="bg-[#1a120c] text-white py-4 font-bold tracking-widest hover:bg-[#c9a35a] hover:text-[#1a120c] transition mt-2">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}