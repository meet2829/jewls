import React, { useState } from "react";
import FormInput from "../Component/utils/FormInput";

const ProductForm = ({ refreshProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    oldPrice: "",
    description: "",
    imageUrl: "",
    category: "",
    additionalImages: "",
    Stock: "",
    rating: "",
    sale: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "Stock"
          ? Math.max(0, parseInt(value) || 0) // Ensure Stock is integer >= 0
          : type === "checkbox"
            ? checked
            : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/products/products`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      // Reset form after success
      setFormData({
        name: "",
        price: "",
        oldPrice: "",
        description: "",
        imageUrl: "",
        additionalImages: "",
        category: "",
        rating: "",
        Stock: "",
        sale: false,
      });

      refreshProducts();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 mb-8 space-y-4"
    >
      <h2 className="text-xl font-semibold">➕ Add Product</h2>

      <FormInput name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
      <FormInput name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required  />
      <FormInput name="oldPrice" type="number" placeholder="Old Price" value={formData.oldPrice} onChange={handleChange}  />
      <FormInput name="description" placeholder="Description" value={formData.description} onChange={handleChange} required  />
      <FormInput
        name="additionalImages"
        placeholder="Additional Images (comma separated URLs)"
        value={formData.additionalImages || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            additionalImages: e.target.value.split(","),
          })
        }
        className="border p-2 w-full rounded"
      />
      <FormInput name="category" placeholder="Category" value={formData.category} onChange={handleChange} required className="border p-2 w-full rounded" />

      <FormInput
        name="Stock"
        type="number"
        placeholder="Enter Stock Quantity"
        value={formData.Stock}
        onChange={handleChange}
        min="0"
        required
        className="border p-2 w-full rounded"
      />

      <FormInput name="rating" placeholder="Rating (e.g. ★★★★☆)" value={formData.rating} onChange={handleChange} className="border p-2 w-full rounded" />

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
