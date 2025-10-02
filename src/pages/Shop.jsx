import { useState, useEffect } from "react";
import axios from "axios";
import ProductGrid from "../Component/ProductGrid"; // expects products prop

const API_BASE = import.meta.env.VITE_API_URL || "";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // ✅ Fetch all products
        const prodRes = await axios.get(`${API_BASE}/api/products/products`);
        const prods = Array.isArray(prodRes.data)
          ? prodRes.data
          : prodRes.data.products || [];

        setProducts(prods);
        setFilteredProducts(prods);

        // ✅ Fetch categories
        const catRes = await axios.get(`${API_BASE}/api/products/categories`);
        const cats =
          Array.isArray(catRes.data)
            ? catRes.data
            : catRes.data.categories || [];
        setCategories(cats.length ? cats : Array.from(new Set(prods.map(p => p.category).filter(Boolean))));
      } catch (err) {
        console.error("Error fetching products or categories:", err);
        setProducts([]);
        setFilteredProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter & sort products whenever search/category/sort changes
  useEffect(() => {
    let results = [...products];

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      results = results.filter(
        p =>
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.overview && p.overview.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      results = results.filter(p => p.category === selectedCategory);
    }

    // Sorting
    results = sortProducts(results, sortBy);

    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, sortBy, products]);

  const sortProducts = (items, sortType) => {
    const copy = [...items];
    switch (sortType) {
      case "price-low":
        return copy.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
      case "price-high":
        return copy.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
      case "name":
        return copy.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      case "rating":
        return copy.sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0));
      case "sale":
        return copy.sort((a, b) => (b.sale ? 1 : 0) - (a.sale ? 1 : 0));
      case "newest":
      default:
        return copy.sort((a, b) => {
          if (a.createdAt && b.createdAt) return new Date(b.createdAt) - new Date(a.createdAt);
          if (a._id && b._id) return String(b._id).localeCompare(String(a._id));
          return 0;
        });
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("newest");
  };

  const hasActiveFilters = Boolean(searchTerm) || selectedCategory !== "all" || sortBy !== "newest";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop All Products</h1>
          <p className="text-gray-600">Browse our complete collection of amazing products</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Category & Sort */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1 w-full sm:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="flex-1 w-full sm:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md"
              >
                <option value="newest">Newest First</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="sale">On Sale</option>
              </select>
            </div>

            <div className="text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-md">
              <span className="font-medium">{filteredProducts.length}</span>
              {hasActiveFilters ? " products found" : " products total"}
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && <p className="text-center py-12 text-gray-600">Loading products...</p>}

        {/* Product Grid */}
        {!loading && <ProductGrid products={filteredProducts} />}
      </div>
    </div>
  );
};

export default Shop;
