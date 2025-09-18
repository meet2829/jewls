import React, { useState } from "react";

const ProductForm = ({ refreshProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    oldPrice: "",
    description: "",
    imageUrl: "",
    category: "",
    rating: "",
    sale: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({
      name: "",
      price: "",
      oldPrice: "",
      description: "",
      imageUrl: "",
      category: "",
      rating: "",
      sale: false,
    });
    refreshProducts();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 mb-8 space-y-4"
    >
      <h2 className="text-xl font-semibold">➕ Add Product</h2>

      <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="border p-2 w-full rounded" />
      <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2 w-full rounded" />
      <input name="oldPrice" type="number" placeholder="Old Price" value={formData.oldPrice} onChange={handleChange} className="border p-2 w-full rounded" />
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 w-full rounded" />
      <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl} onChange={handleChange} className="border p-2 w-full rounded" />
      <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border p-2 w-full rounded" />
      <input name="rating" placeholder="Rating (e.g. ★★★★☆)" value={formData.rating} onChange={handleChange} className="border p-2 w-full rounded" />

      <label className="flex items-center space-x-2">
        <input type="checkbox" name="sale" checked={formData.sale} onChange={handleChange} />
        <span>On Sale</span>
      </label>

      {/* Image Preview */}
      {formData.imageUrl && (
        <div className="flex justify-center">
          <img src={formData.imageUrl} alt="preview" className="w-32 h-32 object-cover rounded-lg border" />
        </div>
      )}

      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full">
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
