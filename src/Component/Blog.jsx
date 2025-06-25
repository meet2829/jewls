import React from 'react'
import blog1 from "../assets/blog (1).jpg"
import blog2 from "../assets/blog (2).jpg"
import blog3 from "../assets/blog (3).jpg"
import blog4 from "../assets/blog (4).jpg"
import { Link } from "react-router-dom";
import blogbanner from "../assets/blogbanner.jpg"
import Footer from './Footer';
import blogvideo from "../assets/blogvideo.mp4"
const Blog = () => {


  return (
    <div className="font-sans bg-[#fcedeb] text-[#111]">
      {/* Header */}
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
          <button>🔍</button>
          <button>🛒(0)</button>
        </div>
      </header>

      {/* Hero */}
      <div
        className="w-full h-[60vh] px-4 md:px-20 text-center mt-2.5 bg-no-repeat bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${blogbanner})` }}
        data-aos="fade-down"
      >
        <h1 className="text-4xl font-bold text-gray-700">Blog</h1>
      </div>

      {/* Blog Post 1 */}
      <div className="max-w-6xl mx-auto px-4 py-20" data-aos="fade-up">
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          <div className="w-full lg:w-1/2" data-aos="zoom-in">
            <img
              src={blog3}
              alt="10 Must-Have Pieces"
              className="w-full h-[400px] object-cover rounded"
            />
          </div>
          <div className="w-full lg:w-1/2" data-aos="fade-left">
            <p className="text-sm text-[#C9A9A6] mb-2 uppercase tracking-wide">
              June 15, 2025 - Jewelry
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#2D2D2D] mb-4">
              10 Must-Have Pieces for the Modern Woman
            </h2>
            <p className="text-[#4E4E4E] mb-4">
              Discover the timeless essentials every woman should have in her jewellery box.
              From delicate necklaces to statement rings, explore the must-haves of this season.
            </p>
            <Link to="/blog/1" className="text-[#B76E79] italic hover:underline">
              Read More
            </Link>
          </div>
        </div>
      </div>

      {/* Blog Post 2 */}
      <div className="max-w-6xl mx-auto px-4 pb-20" data-aos="fade-up">
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          <div className="w-full lg:w-1/2" data-aos="zoom-in">
            <img
              src={blog2}
              alt="Gold & Rose"
              className="w-full h-[400px] object-cover rounded"
            />
          </div>
          <div className="w-full lg:w-1/2" data-aos="fade-right">
            <p className="text-sm text-[#C9A9A6] mb-2 uppercase tracking-wide">
              May 30, 2025 - Style
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#2D2D2D] mb-4">
              Gold & Rose: A Match Made in Heaven
            </h2>
            <p className="text-[#4E4E4E] mb-4">
              Explore how gold and rose tones come together to define elegance.
              A perfect harmony of soft shimmer and luxury warmth in every piece.
            </p>
            <Link to="/blog/2" className="text-[#B76E79] italic hover:underline">
              Read More
            </Link>
          </div>
        </div>
      </div>

      {/* Blog Post 3 */}
      <div className="max-w-6xl mx-auto px-4 pb-20" data-aos="fade-up">
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          <div className="w-full lg:w-1/2" data-aos="zoom-in">
            <img
              src={blog1}
              alt="Behind the Design"
              className="w-full h-[400px] object-cover rounded"
            />
          </div>
          <div className="w-full lg:w-1/2" data-aos="fade-left">
            <p className="text-sm text-[#C9A9A6] mb-2 uppercase tracking-wide">
              May 10, 2025 - Inspiration
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#2D2D2D] mb-4">
              Behind the Design: Crafting Luxury
            </h2>
            <p className="text-[#4E4E4E] mb-4">
              Go behind the scenes with our artisans and designers. See how a spark of creativity
              is transformed into finely crafted, timeless pieces.
            </p>
            <Link to="/blog/3" className="text-[#B76E79] italic hover:underline">
              Read More
            </Link>
          </div>
        </div>
      </div>


      <div>

        <div className="bg-[#fff8f5] text-[#1a1a1a] font-sans">
          {/* Blog Post with Video */}
          <div className="max-w-5xl mx-auto px-4 py-16 border-b">
            <div className="mb-6">
              <video
                className="w-full h-[400px] object-cover rounded"
                 autoPlay loop muted playsInline
              >
                <source src={blogvideo} type="video/mp4"  />
                Your browser does not support the video tag.
              </video>
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              <em>50th Anniversary</em> our Sunglasses
            </h2>
            <p className="text-gray-600 mb-4">
              Has autem commendavi, ex per ridens officiis probo fierent adolescens ne has. Cu illum quaestio complectitur has,
              vidit tribus esse. Mediocritatem referrentur ne vis! Mea libris ponderum an. Nullam nostrum adipiscing no nec.
            </p>
            <div className="flex justify-between text-sm">
              <a href="#" className="text-red-700 italic hover:underline">Read More</a>
              <a href="#" className="hover:underline">Share ↗</a>
            </div>
          </div>

          {/* Blog Post with Image */}
          <div className="max-w-5xl mx-auto px-4 py-16 border-b">
  <div className="mb-6">
    <img
      src={blog4}
      alt="Blog 2"
      className="w-full max-h-[400px] object- rounded"
    />
  </div>

            <p className="text-xs text-gray-500 uppercase mb-2">May 6, 2025 · Fashion · Style</p>
            <h2 className="text-2xl font-semibold mb-2">
              Best Sunglasses <em>for Sunday Brunch</em>
            </h2>
            <p className="text-gray-600 mb-4">
              Has autem commendavi, ex per ridens officiis probo fierent adolescens ne has. Cu illum quaestio complectitur has,
              vidit tribus esse. Mediocritatem referrentur ne vis!
            </p>
            <div className="flex justify-between text-sm">
              <a href="#" className="text-red-700 italic hover:underline">Read More</a>
              <a href="#" className="hover:underline">Share ↗</a>
            </div>
          </div>

          {/* Quote Section */}
          <div className="m-10 max-w-4xl mx-auto px-6 py-16 bg-[#fef3f1] mt-10 rounded border-l-[6px] border-[#e4c0ba]">
            <blockquote className="text-center italic text-lg text-gray-700">
              “Don’t try to dress like me or wear your hair like mine. Find your own style.”
            </blockquote>
            
          </div>
        </div>
      </div>


      {/* footer */}
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Blog
