import React, { useState } from "react";

const ProductList = ({ products, refreshProducts }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    oldPrice: "",
    description: "",
    imageUrl: "",
    category: "",
    Stock: "",
    rating: "",
    sale: false,
  });

  // Delete Product
 const handleDelete = async (id) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/products/${id}`);

    toast.success("Product deleted successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    refreshProducts();
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || err.message || "Error deleting product";

    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
};

  // Open Edit Form
  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setEditForm(product);
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm({
      ...editForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Save Edited Product
  const handleSave = async () => {
    try {
       await axios.put(`${import.meta.env.VITE_API_URL}/api/products/products/${editingProduct}`, editForm);
    

        toast.success("Product updated successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
      setEditingProduct(null);
      refreshProducts();
    } catch (err) {

      toast.error('Network error while updating product', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">📦 Product List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transform hover:scale-105 transition duration-300 relative"
          >
            {/* Sale Badge */}
            {product.sale && (
              <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                SALE
              </span>
            )}

            {/* Product Image */}
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-contain rounded-xl mb-4"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/* Product Info */}
            <h3 className="font-bold text-lg mb-1">{product.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-xl font-semibold text-green-600">₹{product.price}</p>
              {product.oldPrice && (
                <p className="text-gray-400 line-through text-sm">₹{product.oldPrice}</p>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-1">{product.description || "No description"}</p>
            <p className="text-gray-500 text-sm mb-1">Category: {product.category}</p>
            <p className="text-xl font-semibold text-green-600">Stock:{product.Stock}</p>
            <p className="text-yellow-400 font-semibold">{product.rating}</p>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEditClick(product)}
                className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0  backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-96 shadow-2xl animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">✏️ Edit Product</h2>

            <div className="space-y-3">
              <input
                name="name"
                value={editForm.name}
                onChange={handleChange}
                placeholder="Name"
                className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
              />
              <input
                name="price"
                type="number"
                value={editForm.price}
                onChange={handleChange}
                placeholder="Price"
                className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />
              <input
                name="oldPrice"
                type="number"
                value={editForm.oldPrice}
                onChange={handleChange}
                placeholder="Old Price"
                className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-gray-400 outline-none"
              />
              <input
                name="description"
                value={editForm.description}
                onChange={handleChange}
                placeholder="Description"
                className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                name="imageUrl"
                value={editForm.imageUrl}
                onChange={handleChange}
                placeholder="Image URL"
                className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
              />
            

              <input
                name="Stock"
                type="number"
                value={editForm.Stock ?? editForm.stock ?? 0}
                onChange={handleChange}
                min="0"
                placeholder="Enter Stock Quantity"
                className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
              />

              <input
                name="category"
                value={editForm.category}
                onChange={handleChange}
                placeholder="Category"
                className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              />
              <input
                name="rating"
                value={editForm.rating}
                onChange={handleChange}
                placeholder="Rating (★★★★☆)"
                className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-yellow-300 outline-none"
              />
              <label className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  name="sale"
                  checked={editForm.sale}
                  onChange={handleChange}
                  className="h-4 w-4 accent-red-500"
                />
                <span>On Sale</span>
              </label>

              {/* Image Preview */}
              {editForm.imageUrl && (
                <div className="flex justify-center mt-3">
                  <img
                    src={editForm.imageUrl}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                  />
                </div>
              )}

              {/* Save & Cancel Buttons */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-xl font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
