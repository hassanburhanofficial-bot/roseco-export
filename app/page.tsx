import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1a120c] font-sans">
      {/* Announcement Bar */}
      <div className="bg-[#1a120c] text-[#faf6f0] text-center py-2 text-[10px] sm:text-xs tracking-widest uppercase">
        <p>Premium Leather Craftsmanship &nbsp;|&nbsp; Worldwide Shipping &nbsp;|&nbsp; Custom Orders Available</p>
      </div>

      {/* Navbar */}
      <nav className="bg-[#2a1d13] text-[#faf6f0] py-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-[0.2em] font-serif text-white">
            ROSCO<span className="text-[#c9a35a]"> EXPORT</span>
          </Link>
          
          <div className="hidden md:flex gap-6 text-xs uppercase tracking-widest items-center">
            <Link href="/" className="hover:text-[#c9a35a] transition">Home</Link>
            <Link href="/shop" className="hover:text-[#c9a35a] transition">Shop All</Link>
            <Link href="/custom-orders" className="hover:text-[#c9a35a] transition">Custom Orders</Link>
            <Link href="/about" className="hover:text-[#c9a35a] transition">About Us</Link>
            <Link href="/contact" className="hover:text-[#c9a35a] transition">Contact Us</Link>
          </div>

          <div className="flex gap-5 text-lg items-center">
            <Link href="/shop" className="cursor-pointer hover:text-[#c9a35a]">🔍</Link>
            <Link href="/wishlist" className="cursor-pointer hover:text-[#c9a35a]">❤️</Link>
            <Link href="/cart" className="cursor-pointer hover:text-[#c9a35a]">🛍️</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-start px-6 md:px-20">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1920&q=80')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a120c]/95 via-[#1a120c]/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-2xl text-white">
          <p className="text-[#c9a35a] tracking-[0.3em] text-xs uppercase mb-4 font-bold">Est. Export Quality</p>
          <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-6">
            CRAFTED IN<br/><span className="text-[#c9a35a]">LEATHER.</span><br/>BUILT TO LAST.
          </h2>
          <p className="text-gray-300 text-lg mb-10 max-w-md">
            Discover premium leather craftsmanship, timeless designs, and quality made for the world.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop" className="bg-[#c9a35a] text-[#1a120c] px-8 py-3 text-sm font-bold tracking-wider hover:bg-[#b8933f] transition">
              EXPLORE COLLECTION
            </Link>
            <Link href="/about" className="border border-white/50 text-white px-8 py-3 text-sm font-bold tracking-wider hover:bg-white hover:text-[#1a120c] transition">
              DISCOVER OUR STORY
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#c9a35a] text-xs tracking-widest uppercase mb-2 font-bold">Curated Selections</p>
          <h3 className="text-4xl font-serif">Featured Categories</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category 1 */}
          <Link href="/shop" className="group relative h-96 overflow-hidden cursor-pointer block">
            <img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80" alt="Jackets" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h4 className="text-2xl font-serif">Leather Jackets</h4>
            </div>
          </Link>
          {/* Category 2 */}
          <Link href="/shop" className="group relative h-96 overflow-hidden cursor-pointer block">
            <img src="https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=80" alt="Wallets" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h4 className="text-2xl font-serif">Leather Wallets</h4>
            </div>
          </Link>
          {/* Category 3 */}
          <Link href="/shop" className="group relative h-96 overflow-hidden cursor-pointer block">
            <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80" alt="Bags" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h4 className="text-2xl font-serif">Leather Bags</h4>
            </div>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a120c] text-gray-400 py-12 text-center mt-10">
        <h2 className="text-2xl font-serif text-white mb-4">ROSCO<span className="text-[#c9a35a]"> EXPORT</span></h2>
        <p className="text-sm mb-4">© 2024 ROSCO EXPORT. All rights reserved.</p>
        
        <div className="flex justify-center gap-6 mt-6 text-xs uppercase tracking-widest mb-6">
            <Link href="/about" className="hover:text-white transition">About</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
            <Link href="/custom-orders" className="hover:text-white transition">Wholesale</Link>
        </div>

        {/* Asli WhatsApp Number Footer Mein */}
        <p className="text-sm">
          WhatsApp: <a href="https://wa.me/923437100232" target="_blank" rel="noopener noreferrer" className="text-[#c9a35a] hover:text-white transition">+92 343 7100232</a>
        </p>
      </footer>
    </div>
  );
}