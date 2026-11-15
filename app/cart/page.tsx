"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Jab page load ho, toh purana cart nikaalo
  useEffect(() => {
    const savedCart = localStorage.getItem("rosco_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Cart data mein error:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // 2. Jab bhi cart change ho, usko save karo (Load hone ke baad)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("rosco_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // 3. Quantity badhane/kam karne ka function
  const updateQty = (id: any, action: "increase" | "decrease") => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQty = action === "increase" ? item.qty + 1 : Math.max(1, item.qty - 1);
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  // 4. Item delete karne ka function
  const removeItem = (id: any) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 5. Subtotal calculate karo
  const subtotal = cartItems.reduce((total, item) => total + Number(item.price) * item.qty, 0);

  // Jab tak data load na ho, loading screen dikhao
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#faf6f0] flex items-center justify-center text-2xl font-serif text-[#1a120c]">
        Loading Cart...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1a120c]">
      {/* Navbar */}
      <nav className="bg-[#2a1d13] text-[#faf6f0] py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-[0.2em] font-serif text-white">
            ROSCO<span className="text-[#c9a35a]"> EXPORT</span>
          </Link>
          <Link href="/shop" className="text-xs uppercase tracking-widest hover:text-[#c9a35a] transition">
            ← Continue Shopping
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-serif mb-10 border-b border-gray-300 pb-4">Shopping Bag</h1>

        {cartItems.length === 0 ? (
          // Empty Cart Screen
          <div className="text-center py-24 bg-white border border-gray-200 shadow-sm">
            <p className="text-2xl text-gray-500 mb-8 font-serif">Aapka shopping bag khali hai.</p>
            <Link 
              href="/shop" 
              className="bg-[#c9a35a] text-[#1a120c] px-8 py-4 font-bold tracking-widest hover:bg-[#b8933f] transition inline-block"
            >
              EXPLORE COLLECTION
            </Link>
          </div>
        ) : (
          // Cart Items Layout
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Side: Cart Items List */}
            <div className="w-full lg:w-2/3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 border-b border-gray-200 py-6 bg-white px-4 sm:px-6 mb-4 shadow-sm">
                  <img 
                    src={item.image || "https://via.placeholder.com/150"} 
                    alt={item.name} 
                    className="w-28 h-28 object-cover border border-gray-200"
                  />
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-xl font-serif mb-2">{item.name}</h3>
                    <p className="text-[#c9a35a] font-bold">${Number(item.price).toFixed(2)}</p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-300 bg-white">
                    <button onClick={() => updateQty(item.id, "decrease")} className="px-4 py-2 hover:bg-gray-100 text-xl">-</button>
                    <span className="px-4 font-bold w-12 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, "increase")} className="px-4 py-2 hover:bg-gray-100 text-xl">+</button>
                  </div>

                  {/* Item Total Price */}
                  <div className="font-bold text-lg min-w-[80px] text-right">
                    ${(Number(item.price) * item.qty).toFixed(2)}
                  </div>
                  
                  {/* Delete Button */}
                  <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 p-2 text-xl transition">
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            {/* Right Side: Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white border border-gray-200 p-8 shadow-sm sticky top-24">
                <h2 className="text-2xl font-serif mb-6 border-b border-gray-200 pb-4">Order Summary</h2>
                
                <div className="flex justify-between mb-4 text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-6 text-gray-600">
                  <span>Shipping</span>
                  <span className="text-sm">Calculated at checkout</span>
                </div>
                
                <div className="flex justify-between text-xl font-bold border-t border-gray-200 pt-4 mb-8">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {/* Checkout Button */}
                <Link 
                  href="/checkout"
                  className="block text-center w-full bg-[#1a120c] text-white py-4 font-bold tracking-widest hover:bg-[#c9a35a] hover:text-[#1a120c] transition"
                >
                  PROCEED TO CHECKOUT
                </Link>

                <p className="text-xs text-center text-gray-500 mt-4">
                  Safe & Secure Checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}