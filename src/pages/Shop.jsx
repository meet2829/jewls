import React from 'react'
import { Link } from "react-router-dom";
import ProductGrid from '../Component/ProductGrid'
import Navbar from '../Component/Navbar';

const Shop = () => {
  return (
    <div>

      <section className="relative overflow-hidden bg-[#fcedeb] text-[#111]">
                      {/* Navbar */}
                      <Navbar />
       </section>
        <ProductGrid />
      
    </div>
  )
}

export default Shop
