import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { addToCart } from '../Component/utils/cartUtils';
import { Link } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Error fetching product', err));
  }, [id]);

  if (!product) return <div className="p-10">Loading...</div>;

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

    
    <div className="p-10 max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-start">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full md:w-1/2 h-96 object-contain border rounded"
      />
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <p className="text-sm uppercase text-gray-500 tracking-wider">{product.category}</p>
        <div className="text-red-600 my-2">{product.rating || '★★★★☆'}</div>
        <p className="text-lg font-medium text-gray-800 mb-4">
          {product.oldPrice && (
            <span className="line-through text-gray-400 mr-2">${product.oldPrice}</span>
          )}
          ${product.price}
        </p>
        <p className="text-sm text-gray-700 mb-6">{product.description}</p>
        <button
          onClick={() => {
            addToCart(product);
            alert("Added to cart!");
          }}
          className="bg-red-700 text-white px-6 py-3 rounded hover:bg-red-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
</div> );
};

export default ProductDetail;
