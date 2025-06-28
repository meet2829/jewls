import React from 'react'
import bgImage from '../assets/main-bg.png';
import goldImage from '../assets/goldjewls.jpg';
import { FaMapMarkerAlt, FaHeart, FaComments, FaDotCircle } from "react-icons/fa";
import img1 from '../assets/img-1.jpg';
import img2 from '../assets/img-2.jpg'
import img3 from '../assets/img-3.jpg'
import img4 from '../assets/img-4.jpg'
import promoVideo from '../assets/main-video.mp4'
import { Link } from "react-router-dom";
import ContactForm from './ContactForm';
import Footer from './Footer';
import CartPage from './CartPage';
import ProductGrid from './ProductGrid'





const Home = () => {


    return (
        <div>
            <section className="relative overflow-hidden   text-[#111]">
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundColor: "#F2D3D3",
                        clipPath: "polygon(50% 0%, 100% 0, 100% 43%, 100% 83%, 67% 93%, 34% 85%, 4% 96%, 0% 43%, 0 0)",
                        WebkitClipPath: "polygon(50% 0%, 100% 0, 100% 43%, 100% 83%, 67% 93%, 34% 85%, 4% 96%, 0% 43%, 0 0)",
                    }}
                ></div>
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
                        <button>🔍</button>
                        <Link to="/Cartpage" className="hover:underline">🛒(0)</Link>
                    </div>
                </header>
                {/* Hero Content */}
                <div className="relative h-screen w-full">
                    {/* Background */}
                    <div
                        className="absolute inset-0 z-0 bg-contain bg-right bg-no-repeat h-202 w-full"
                        style={{
                            backgroundImage: `url(${bgImage})`,
                            clipPath: "polygon(50% 0%, 100% 0, 100% 43%, 100% 83%, 67% 93%, 34% 85%, 4% 96%, 0% 43%, 0 0)",
                            WebkitClipPath: "polygon(50% 0%, 100% 0, 100% 43%, 100% 83%, 67% 93%, 34% 85%, 4% 96%, 0% 43%, 0 0)",
                            pointerEvents: "none",

                        }}
                    ></div>
                    {/* Text Content */}
                    <div className="absolute inset-0 z-10 flex items-center justify-start text-left px-8 md:px-24" data-aos="fade-up">
                        <div className="max-w-4xl">
                            <p className="uppercase tracking-widest text-sm">Fall Winter Collection 2025/26</p>
                            <h1 className="text-5xl md:text-6xl font-bold font-serif my-4">
                                The <span className="text-red-600 italic text-6xl md:text-7xl">New</span> Trend
                            </h1>
                            <p className="text-gray-700 max-w-xl mt-4 mb-6">
                                Inspired by the upcoming season our new winter/fall collection has an elegant autumn vibe.
                                Make your outfits stand out with our accessories.
                            </p>
                            <button className="bg-red-700 text-white px-6 py-3 uppercase text-sm tracking-wider hover:bg-red-800 transition">
                                View More
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            <div className="py-16 bg-white mt-[10rem]" data-aos='zoom-in'>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center px-4">

                    <div>
                        <FaMapMarkerAlt className="text-4xl text-orange-300 mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">Have a Plan</h3>
                        <p className="text-sm text-gray-600">
                            Inspire customers to plan ahead for occasions like weddings, birthdays, anniversaries, or seasonal gifts — while showcasing how your jewelry can be a perfect match.
                        </p>
                        <div className="h-[2px] w-6 bg-black mx-auto mt-4"></div>
                    </div>

                    <div>
                        <FaHeart className="text-4xl text-orange-300 mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">Creative Style</h3>
                        <p className="text-sm text-gray-600">
                            Here’s a creatively styled version of a “Have a Plan” section for your jewelry website — something elegant, luxurious, and aspirational — matching a premium brand tone.
                        </p>
                        <div className="h-[2px] w-6 bg-black mx-auto mt-4"></div>
                    </div>

                    <div>
                        <FaComments className="text-4xl text-orange-300 mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">Top Blogging</h3>
                        <p className="text-sm text-gray-600">
                            Style, sparkle, and stories that inspire.
                            Explore our handpicked blog posts about jewelry trends, styling tips, craftsmanship secrets, and more. Because every gem has a story — and we love telling it.
                        </p>
                        <div className="h-[2px] w-6 bg-black mx-auto mt-4"></div>
                    </div>

                    <div>
                        <FaDotCircle className="text-4xl text-orange-300 mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">Enjoy Contrast</h3>
                        <p className="text-sm text-gray-600">
                            In every gem, a story of balance.
                            Where bold brilliance meets delicate elegance, and heritage meets modern flair — discover the harmony of opposites in our curated pieces.
                        </p>
                        <div className="h-[2px] w-6 bg-black mx-auto mt-4"></div>
                    </div>

                </div>
            </div>





            <div className="flex flex-col lg:flex-row items-center justify-between bg-[#f9f3ef]  mt-[10rem]">
                {/* Left Image */}
                <div className="w-full lg:w-1/2">
                    <img
                        src={goldImage}
                        alt="Gold Rose Collection"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Text Content */}
                <div className="w-full lg:w-1/2 p-8 md:p-16 text-center lg:text-left" data-aos='fade-left'>
                    <h2 className="text-2xl md:text-3xl font-semibold font-serif mb-4">
                        Gold Rose Collection
                    </h2>
                    <div className="w-12 h-[2px] bg-black mb-4 mx-auto lg:mx-0"></div>
                    <p className="text-gray-700 mb-4">
                        Romance meets refinement in this exclusive collection. Handcrafted gold pieces infused with rose motifs and floral artistry — designed to be gifted, worn, and treasured forever.
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        Inspired by the softness of roses and the strength of gold, this collection captures love, beauty, and timeless craftsmanship.
                        From delicate rose-shaped pendants to radiant gold bangles kissed with floral detail — embrace elegance that never fades.
                    </p>
                    <a href="#" className="text-sm italic underline text-red-700 hover:text-red-900">
                        View more
                    </a>
                </div>
            </div>


            <div className="py-16 bg-white">
                <div className="text-center max-w-3xl mx-auto mb-12 px-4">
                    <p className="text-sm tracking-widest uppercase">New Fall Collection</p>
                    <h2 className="text-4xl font-bold mb-4">
                        Find <span className="italic">the</span> Inspiration
                    </h2>
                    <p className="text-gray-600">
                        Discover textured metals, earthy gemstones, and cozy elegance crafted into every piece. Let autumn’s poetry reflect in your style.
                    </p>
                    <div className="h-[2px] w-10 bg-black mx-auto mt-4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
                    {/* Card 1 */}
                    <div className="text-center" data-aos="flip-up">
                        <img
                            src={img1}
                            alt="Sunglasses are Forever"
                            className="w-full h-96 object-cover mb-4"
                        />
                        <p className="text-xs text-gray-500">09.04.2021. - Design - Jewelry</p>
                        <h3 className="font-bold text-lg mt-2 mb-1">Sunglasses are Forever</h3>
                        <p className="text-sm text-gray-600 mb-2">
                            From sunlit strolls to golden hour glam, our sunglasses aren’t just for today — they’re for every unforgettable look.
                        </p>
                        <a href="#" className="text-red-600 italic text-sm hover:underline">Read More</a>
                    </div>

                    {/* Card 2 */}
                    <div className="text-center bg-gray-50 p-2" data-aos="flip-down">
                        <img
                            src={img2}
                            alt="Red Lipstick is Right Choice"
                            className="w-full h-96 object-cover mb-4"
                        />
                        <p className="text-xs text-gray-500">09.04.2021. - Design - Jewelry</p>
                        <h3 className="font-bold text-lg mt-2 mb-1">Red Lipstick is Right Choice</h3>
                        <p className="text-sm text-gray-600 mb-2">
                            Our curated red-toned jewelry, makeup, and accessories are crafted to amplify your boldness, refine your edge, and let your inner fire shine.
                        </p>
                        <a href="#" className="text-red-600 italic text-sm hover:underline">Read More</a>
                    </div>

                    {/* Card 3 */}
                    <div className="text-center" data-aos="flip-up">
                        <img
                            src={img3}
                            alt="Why Not Overuse Leopard?"
                            className="w-full h-96 object-cover mb-4"
                        />
                        <p className="text-xs text-gray-500">09.04.2021. - Design - Jewelry</p>
                        <h3 className="font-bold text-lg mt-2 mb-1">Why Not Overuse Leopard?</h3>
                        <p className="text-sm text-gray-600 mb-2">
                            Whether on fabric, metals, or accessories, animal print roars with confidence.
                            So go ahead — clash it, stack it, layer it.
                        </p>
                        <a href="#" className="text-red-600 italic text-sm hover:underline">Read More</a>
                    </div>
                </div>
            </div>



            <div className="flex flex-col md:flex-row w-full min-h-[60vh]">
                {/* Left Section: Form */}
                <ContactForm />

                {/* Right Section: Image */}
                <div className="w-full md:w-1/2 h-[500px] ">
                    <img
                        src={img4}
                        alt="Contact Visual"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="mt-35 w-full h-[500px] object-contain ">
                <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                    <source src={promoVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div>
                <ProductGrid />
            </div>


            <div className="bg-white">
                {/* Instagram Section */}
                <div className="text-center py-16">
                    <p className="uppercase text-sm tracking-widest text-gray-500" data-aos="fade-left">Follow our stories</p>
                    <h2 className="text-3xl font-serif font-semibold italic mt-2" data-aos="fade-right">
                        Find <span className="not-italic">Us</span> On Instagram
                    </h2>
                    <div className="h-[2px] w-12 bg-black mx-auto mt-2"></div>
                </div>

                {/* Footer Section */}


                <Footer />
            </div>




        </div>)
}

export default Home
