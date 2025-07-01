import React from 'react'
import { Link } from "react-router-dom";
import ProductGrid from './ProductGrid'

const Shop = () => {
  return (
    <div>

      <section className="relative overflow-hidden bg-[#fcedeb] text-[#111]">
                      {/* Navbar */}
                      <header className="z-20 relative flex justify-between items-center px-8 py-6">
                    <div className="text-3xl font-bold">Jewls</div>
                    <nav className="hidden md:flex space-x-6 text-sm">
                        <Link to="/" className="hover:underline">Home</Link>
                        <Link to="/blog" className="hover:underline">Blog</Link>
                        <Link to="/shop" className="hover:underline">Shop</Link>
                        <Link to="/contactus" className="hover:underline">Contact Us</Link>
                        <Link to="/aboutus" className="hover:underline">About Us</Link>
                    </nav>
                    <div className="flex space-x-4 items-center">
                        <Link to="/login" className="hover:underline">Login</Link>
                        
                        <Link to="/Cartpage" className="hover:underline">🛒</Link>
                        
                    </div>
                </header>
       </section>
        <ProductGrid />
      
    </div>
  )
}

export default Shop
