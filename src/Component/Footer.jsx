import React from 'react'

const Footer = () => {
  return (
    <div>

        <footer className="bg-[#111] text-white py-16 px-8">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                        {/* About */}
                        <div>
                            <h3 className="text-2xl font-bold font-serif">Jewls</h3>
                            <p className="text-sm text-gray-300 mt-4" >
                                A truly fresh and elegantly devised spirit of modern fashion sensibilities. Welcome to Giada, where beauty comes first.
                            </p>
                            <div className="flex space-x-3 mt-4 text-lg">
                                <i className="fab fa-facebook-f"></i>
                                <i className="fab fa-youtube"></i>
                                <i className="fab fa-twitter"></i>
                                <i className="fab fa-instagram"></i>
                            </div>
                        </div>

                        {/* FAQ */}
                        <div>
                            <h4 className="font-bold text-lg mb-4">Frequently Asked Questions</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>Can I make reservations online?</li>
                                <li>How long does delivery take?</li>
                                <li>Do you offer loyalty discounts?</li>
                                <li>How do I locate nearest stores?</li>
                                <li>How to pick a payment method?</li>
                                <li>What is your item return policy?</li>
                            </ul>
                        </div>

                        {/* Blog */}
                        <div>
                            <h4 className="font-bold text-lg mb-4">Read Our Blog Weekly</h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li>
                                    <p>Style is who you are</p>
                                    <span className="text-xs text-gray-500">05.04.2021</span>
                                </li>
                                <li>
                                    <p>Fashion Fades. Style is eternal.</p>
                                    <span className="text-xs text-gray-500">07.04.2021</span>
                                </li>
                                <li>
                                    <p>Elegance is paramount</p>
                                    <span className="text-xs text-gray-500">07.04.2021</span>
                                </li>
                                <li>
                                    <p>Little special black dress</p>
                                    <span className="text-xs text-gray-500">07.04.2021</span>
                                </li>
                            </ul>
                        </div>

                        {/* Subscribe */}
                        <div>
                            <h4 className="font-bold text-lg mb-4">Subscribe</h4>
                            <p className="text-sm text-gray-400 mb-4">
                                Sign up for all the latest fashion tips, discount updates & more.
                            </p>
                            <input
                                type="email"
                                placeholder="Your e-mail"
                                className="w-full bg-transparent border-b border-gray-400 text-sm px-2 py-1 mb-4 placeholder-gray-400 focus:outline-none"
                            />
                            <button className="bg-red-700 text-white px-6 py-2 uppercase text-sm hover:bg-red-800 transition">
                                Submit
                            </button>
                        </div>

                    </div>
                </footer>
      
    </div>
  )
}

export default Footer
