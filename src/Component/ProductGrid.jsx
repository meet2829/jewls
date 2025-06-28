import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products", err));
  }, []);

  return (
    <div className="py-10 px-4 text-center">
      <h5 className="uppercase text-gray-500 text-sm tracking-widest" data-aos="zoom-in">
        Summer Collection
      </h5>
      <h2 className="text-3xl font-semibold italic my-2" data-aos="zoom-in">
        The <span className="font-bold not-italic">Best</span> Products
      </h2>
      <p className="text-gray-500 max-w-2xl mx-auto text-sm mb-10" data-aos="zoom-in">
        The Best Products for your brightest season.
        From sunrise earrings to sunset-gold rings, every piece in our Summer Edit is made to shine under the sun.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
