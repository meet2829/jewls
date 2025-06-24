import React from "react";
import manwatch from '../assets/man watch 3.jpg';
import img5 from '../assets/113.jpg';
import img6 from '../assets/product-featured-83.jpg'
import img7 from '../assets/product-featured-84.jpg'
import img8 from '../assets/product-featured-85.jpg'
import img9 from '../assets/product-featured-86.jpg'
import img10 from '../assets/product-featured-106.jpg'
import img11 from '../assets/woman watch 2.jpg'

const BestProducts = () => {
  return (
    <div className="py-10 px-4 text-center" >
      <h5 className="uppercase text-gray-500 text-sm tracking-widest" data-aos="zoom-in">Summer Collection</h5>
      <h2 className="text-3xl font-semibold italic my-2" data-aos="zoom-in">
        The <span className="font-bold not-italic">Best</span> Products
      </h2>
      <p className="text-gray-500 max-w-2xl mx-auto text-sm mb-10" data-aos="zoom-in">
        Brute instructor cu mea, pro ad facer scaevola accommodare. Augue legendos inimicus sed et, ad est
        alterum equidem Brute instructor cu mea, pro ad facer.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* 1st Product */}
        <div className="relative border p-4 rounded-md shadow hover:shadow-lg transition">
          <div className="absolute top-2 left-2 bg-red-700 text-white px-2 py-1 text-xs font-bold rounded">
            SALE
          </div>
          <img src={img5} alt="Vintage Necklace" className="w-full h-52 object-contain mb-3" />
          <p className="text-xs tracking-widest text-gray-500 uppercase">VINTAGE</p>
          <h3 className="font-semibold">Diamond Ring</h3>
          <div className="text-red-700 text-sm">★★★★☆</div>
          <p className="mt-1">
            <span className="line-through text-gray-400 mr-2">$125.00</span>
            <span className="text-lg font-medium text-gray-800">$60.00</span>
          </p>
        </div>

        {/* 2nd Product */}
        <div className="border p-4 rounded-md shadow hover:shadow-lg transition">
          <img src={img6} alt="Golden Pendant" className="w-full h-52 object-contain mb-3" />
          <p className="text-xs tracking-widest text-gray-500 uppercase">VINTAGE</p>
          <h3 className="font-semibold">Golden Pendant</h3>
          <div className="text-red-700 text-sm">★★★★☆</div>
          <p className="mt-1 text-lg font-medium text-gray-800">$56.00</p>
        </div>

        {/* 3rd Product */}
        <div className="border p-4 rounded-md shadow hover:shadow-lg transition">
          <img src={img7} alt="CatEye Glasses" className="w-full h-52 object-contain mb-3" />
          <p className="text-xs tracking-widest text-gray-500 uppercase">VINTAGE</p>
          <h3 className="font-semibold">Ganesha Pendant</h3>
          <div className="text-red-700 text-sm">★★★☆☆</div>
          <p className="mt-1 text-lg font-medium text-gray-800">$85.00</p>
        </div>

        {/* 4th Product */}
        <div className="border p-4 rounded-md shadow hover:shadow-lg transition">
          <img src={manwatch} alt="Vintage Watch" className="w-full h-52 object-contain mb-3" />
          <p className="text-xs tracking-widest text-gray-500 uppercase">VINTAGE</p>
          <h3 className="font-semibold">Vintage Watch</h3>
          <div className="text-red-700 text-sm">★★★★☆</div>
          <p className="mt-1 text-lg font-medium text-gray-800">$160.00</p>
        </div>

        {/* 5th Product */}
        <div className="border p-4 rounded-md shadow hover:shadow-lg transition">
          <img src={img11} alt="Leather Watch" className="w-full h-52 object-contain mb-3" />
          <p className="text-xs tracking-widest text-gray-500 uppercase">VINTAGE</p>
          <h3 className="font-semibold">Leather Watch</h3>
          <div className="text-red-700 text-sm">★★★★★</div>
          <p className="mt-1 text-lg font-medium text-gray-800">$180.00</p>
        </div>

        {/* 6th Product */}
        <div className="border p-4 rounded-md shadow hover:shadow-lg transition">
          <img src={img9} alt="Pearl Necklace" className="w-full h-52 object-contain mb-3" />
          <p className="text-xs tracking-widest text-gray-500 uppercase">VINTAGE</p>
          <h3 className="font-semibold">Pearl Necklace</h3>
          <div className="text-red-700 text-sm">★★★★☆</div>
          <p className="mt-1 text-lg font-medium text-gray-800">$360.00</p>
        </div>

        {/* 7th Product */}
        <div className="border p-4 rounded-md shadow hover:shadow-lg transition">
          <img src={img8} alt="Vintage Glasses" className="w-full h-52 object-contain mb-3" />
          <p className="text-xs tracking-widest text-gray-500 uppercase">VINTAGE</p>
          <h3 className="font-semibold">Vintage Glasses</h3>
          <div className="text-red-700 text-sm">★★★★★</div>
          <p className="mt-1 text-lg font-medium text-gray-800">$85.00</p>
        </div>

        {/* 8th Product */}
        <div className="border p-4 rounded-md shadow hover:shadow-lg transition">
          <img src={img10} alt="Bracelet" className="w-full h-52 object-contain mb-3" />
          <p className="text-xs tracking-widest text-gray-500 uppercase">VINTAGE</p>
          <h3 className="font-semibold">Bracelet</h3>
          <div className="text-red-700 text-sm">★★★★☆</div>
          <p className="mt-1 text-lg font-medium text-gray-800">$125.00</p>
        </div>
      </div>
    </div>
  );
};

export default BestProducts;
