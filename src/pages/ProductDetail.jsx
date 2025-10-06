import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { addToCart } from "../Redux/Slices/cartSlice";

import { Bounce, toast } from "react-toastify";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch=useDispatch();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products/products/${id}`)
      .then((res) => {
        setProduct(res.data);

        // ✅ pick first image (if exists), otherwise fallback to imageUrl
        if (res.data.images && res.data.images.length > 0) {
          setSelectedImage(res.data.images[0]);
        } else {
          setSelectedImage(res.data.imageUrl);
        }
      })
      .catch((err) => console.error("Error fetching product", err));
  }, [id]);

  if (!product) return <div className="p-10">Loading...</div>;

  // ✅ Collect all images into one array
  const allImages = [
    product.imageUrl,
    ...(product.images || []),
    ...(product.additionalImages || []),
  ].filter(Boolean);

  return (
    <div className="p-10 max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-start">
      {/* Image Gallery */}
      <div className="flex-1">
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full h-96 object-contain border rounded"
        />

        {/* Thumbnails */}
        <div className="flex gap-3 mt-4 overflow-x-auto">
          {allImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumbnail-${idx}`}
              className={`w-20 h-20 object-cover border rounded cursor-pointer hover:scale-105 transition ${
                selectedImage === img ? "border-red-600" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
        <p className="text-sm uppercase text-gray-500 tracking-wider">
          {product.category}
        </p>

        <div className="flex items-center gap-3 mb-4">
          <p className="text-2xl font-semibold text-gray-800">₨ {product.price}</p>
          {product.oldPrice && (
            <p className="line-through text-gray-400 text-lg">
              ₨ {product.oldPrice}
            </p>
          )}
        </div>

        {/* Stock */}
        <p
          className={`font-medium mb-4 ${
            product.Stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.Stock > 0
            ? `In Stock (${product.Stock} available)`
            : "Out of Stock"}
        </p>

        {/* Short Description */}
        <p className="text-gray-700 leading-relaxed mb-6">
          {product.shortDescription}
        </p>  

        {/* Add to Cart */}
        <button
          onClick={() => {
            dispatch(addToCart(product));
            toast.success("Added to cart!", {
              position: "top-right",
              autoClose: 3000,
              theme: "light",
              transition: Bounce,
            });
          }}
          className="bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition"
          disabled={product.Stock <= 0}
        >
          {product.Stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>

        {/* Overview Section */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold mb-2">Overview</h3>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {product.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
