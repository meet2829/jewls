import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import ContactForm from './ContactForm';
import Footer from './Footer';
import contactbg from "../assets/image.png"

const Contact = () => {
  return (
    <div className="font-sans bg-[#f7f7f7] text-[#111]">
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
                        <Link to="/Cartpage" className="hover:underline">🛒</Link>
                        
                    </div>
                </header>


      {/* Hero */}
    <div
  className="w-full py-38 px-4 md:px-20 text-center mt-2.5 bg-no-repeat bg-cover bg-center"
  style={{ backgroundImage: `url(${contactbg})` }}
>
  <h1 className="text-4xl font-bold text-gray-700">About Us</h1>
</div>


      {/* Contact Info */}
      <section className="py-16bg-[#fcedeb] grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-20 m-15">
        <div className="text-center">
          <div className="text-4xl">📍</div>
          <h4 className="text-xl font-semibold mt-4 mb-2">Address</h4>
          <p>Surat, Gujarat, India</p>
        </div>
        <div className="text-center">
          <div className="text-4xl">📞</div>
          <h4 className="text-xl font-semibold mt-4 mb-2">Phone</h4>
          <p>+91 9316011881</p>
        </div>
        <div className="text-center">
          <div className="text-4xl">📧</div>
          <h4 className="text-xl font-semibold mt-4 mb-2">Email</h4>
          <p>Kananimeet46867@gmail.com</p>
        </div>
      </section>

      {/* Map */}
      <div className="w-full">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d586791.5480843313!2d72.45087405263101!3d21.04803037497067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1747306383705!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>

      {/* Contact Form */}
      <section className="bg-[#fcedeb] py-16 px-7 md:px-20">
  <div className="flex justify-center">
    <ContactForm />
  </div>
</section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Contact;
