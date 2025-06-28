import React from 'react';
import founderImage from '../assets/founder.jpg';
import workshopImage from '../assets/workshop.jpg';
import team1 from '../assets/team1.jpg';
import team2 from '../assets/team2.jpg';
import jewelry1 from '../assets/jewls2.jpg';
import { Link } from "react-router-dom";
import Footer from './Footer';

const Aboutus = () => {
  return (
    <div>
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
                        <Link to="/Cartpage" className="hover:underline">🛒(0)</Link>
                        
                    </div>
                </header>

      <div className="font-sans bg-[#fff8f5] text-[#111]">

        {/* Hero Banner */}
        <div
          className="w-full h-[60vh] bg-cover bg-center flex items-center justify-center text-center px-6"
          style={{ backgroundImage: `url(${jewelry1})` }}
          data-aos="fade-in"
        >
          <h1 className="text-4xl font-bold text-white bg-opacity-50 px-7 py-5 rounded">About Us</h1>
        </div>

        {/* Brand Story */}
        <section className="max-w-5xl mx-auto px-4 py-16" data-aos="fade-up">
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 mb-4">
                For generations, our family has handcrafted jewelry with a passion for detail.
                Born from a love of storytelling and heritage, our brand is built on the foundation of timeless design,
                ethical craftsmanship, and modern elegance. Every piece tells a story — yours.
              </p>
              <p className="text-gray-700">
                Our founder, Meera Kapoor, began with a small studio in Jaipur, blending local traditions with global fashion trends.
                Today, our creations celebrate the blend of classic Indian artistry and modern luxury.
              </p>
            </div>
            <img src={founderImage} alt="Founder" className="w-full rounded shadow" data-aos="zoom-in" />
          </div>
        </section>

        {/* Values and USP */}
        <section className="bg-[#fef3f1] py-16" data-aos="fade-up">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-6">Our Mission & Values</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-3">
              <li>Commitment to ethical sourcing and sustainability</li>
              <li>Fusion of traditional techniques with modern design</li>
              <li>Craftsmanship that reflects love, care, and legacy</li>
              <li>Jewelry that empowers personal expression and individuality</li>
            </ul>
          </div>
        </section>

        {/* Workshop / USP Visual */}
        <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <img src={workshopImage} alt="Workshop" className="w-full rounded shadow" data-aos="fade-right" />
          <div data-aos="fade-left">
            <h2 className="text-2xl font-semibold mb-4">What Makes Us Unique</h2>
            <p className="text-gray-700">
              Our jewelry is not mass-produced — each piece is handcrafted using locally sourced, sustainable materials.
              From rose gold filigree to gemstone-inlaid bangles, we blend the past with the present in every design.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-[#fff0ec] py-16" data-aos="fade-up">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Meet Our Team</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div data-aos="fade-up" data-aos-delay="100">
                <img src={team1} alt="Artisan 1" className="w-full h-[300px] object-cover rounded mb-2" />
                <p className="text-gray-500 text-sm">Master Goldsmith</p>
              </div>
              <div data-aos="fade-up" data-aos-delay="200">
                <img src={team2} alt="Artisan 2" className="w-full h-[300px] object-cover rounded mb-2" />
              </div>
            </div>
          </div>
        </section>
        {/* Testimonials */}
        <section className="max-w-4xl mx-auto px-4 py-16" data-aos="zoom-in-up">
          <h2 className="text-2xl font-semibold text-center mb-8">What Our Customers Say</h2>
          <blockquote className="bg-[#fef3f1] p-6 rounded text-center italic text-gray-700 shadow">
            "Absolutely in love with the earrings I ordered. The packaging was gorgeous, and the craftsmanship is even better in person!"
          </blockquote>
        </section>

        {/* CTA */}
        <section className="py-16 text-center" data-aos="fade-up">
          <h2 className="text-2xl font-semibold mb-4">Ready to Find Your Signature Piece?</h2>
          <p className="text-gray-600 mb-6">Browse our latest collection or follow us on Instagram for daily inspiration.</p>
          <a href="/shop" className="inline-block bg-[#b76e79] text-white px-6 py-3 rounded hover:bg-[#a05c65] transition">Shop the Collection</a>
        </section>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Aboutus;
