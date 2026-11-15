"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.supabaseurl!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Cart ka data load karo
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("rosco_cart") || "[]");
    if (savedCart.length === 0) {
      router.push("/cart"); // Agar cart khali hai toh wapas bhej do
    }
    setCartItems(savedCart);
  }, [router]);

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Order ko Database mein save karo
      const { data, error } = await supabase.from("orders").insert([
        {
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          shipping_address: formData.address,
          total_amount: totalAmount,
          order_items: cartItems,
          status: "Pending",
        },
      ]).select();

      if (error) throw error;

      // 2. Cart khali karo
      localStorage.removeItem("rosco_cart");

      alert(`Order Placed Successfully! 🎉\nOrder ID: ${data[0].id}\nHum jald hi aapse raabta karenge.`);
      
      // 3. Home page par wapas bhej do
      router.push("/");

    } catch (error: any) {
      alert("Order place karne mein masla aaya: " + error.message);
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
          <Link href="/cart" className="text-xs uppercase tracking-widest hover:text-[#c9a35a]">
            ← Back to Cart
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-12">
        
        {/* Left Side: Checkout Form */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-serif mb-8 border-b border-gray-300 pb-4">Checkout Details</h1>
          
          <form onSubmit={handlePlaceOrder} className="flex flex-col gap-6 bg-white p-8 border border-gray-200 shadow-sm">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#c9a35a]"
                placeholder="Ali Khan"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full">
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#c9a35a]"
                  placeholder="ali@example.com"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#c9a35a]"
                  placeholder="+92 300 1234567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Complete Shipping Address</label>
              <textarea 
                required rows={4}
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full p-3 border border-gray-300 focus:outline-none focus:border-[#c9a35a]"
                placeholder="House 123, Street 4, Phase 5, DHA, Lahore, Pakistan"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#1a120c] text-white py-4 font-bold tracking-widest hover:bg-[#c9a35a] hover:text-[#1a120c] transition disabled:opacity-50 mt-4"
            >
              {loading ? "PLACING ORDER..." : `PLACE ORDER - $${totalAmount.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full md:w-1/3">
          <div className="bg-[#f4ebd9] p-8 border border-[#c9a35a]/30 sticky top-24">
            <h2 className="text-2xl font-serif mb-6 border-b border-[#c9a35a]/30 pb-4">Your Items</h2>
            
            <div className="flex flex-col gap-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover border border-gray-300" />
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-gray-500">Qty: {item.qty}</p>
                    </div>
                  </div>
                  <span className="font-bold">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#c9a35a]/30 pt-4 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-600 mt-4 text-center">Payment will be collected upon delivery (Cash on Delivery).</p>
          </div>
        </div>
      </div>
    </div>
  );
}