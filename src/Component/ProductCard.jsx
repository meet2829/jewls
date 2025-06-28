import { Link } from "react-router-dom";
import { addToCart } from '../Component/utils/cartUtils';

const ProductCard = ({ product }) => {
  return (
    <div className="relative border p-4 rounded-md shadow hover:shadow-lg transition flex flex-col justify-between">
      {product.sale && (
        <div className="absolute top-2 left-2 bg-red-700 text-white px-2 py-1 text-xs font-bold rounded">
          SALE
        </div>
      )}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-52 object-contain mb-3"
        />
      </Link>

      <p className="text-xs tracking-widest text-gray-500 uppercase">{product.category}</p>
      <Link to={`/product/${product._id}`}>
        <h3 className="font-semibold hover:underline">{product.name}</h3>
      </Link>

      <div className="text-red-700 text-sm">{product.rating || '★★★★☆'}</div>
      <p className="mt-1 mb-3">
        {product.oldPrice && (
          <span className="line-through text-gray-400 mr-2">{product.oldPrice}</span>
        )}
        <span className="text-lg font-medium text-gray-800">{product.price}</span>
      </p>

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
  );
};

export default ProductCard;
