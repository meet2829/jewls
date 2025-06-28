import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (productId, amount) => {
    const updatedCart = cart.map((item) =>
      item._id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemove = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

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


      <div className="px-4 md:px-20 py-12 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded shadow"
              >
                <div className="flex items-center gap-4 w-full md:w-2/3">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 object-contain border"
                  />
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-gray-500 text-sm">{item.category}</p>
                    <div className="text-gray-800 mt-1">
                      ${item.price.toFixed(2)} × {item.quantity}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <button
                    onClick={() => handleQuantityChange(item._id, -1)}
                    className="px-2 py-1 text-lg bg-gray-200 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, 1)}
                    className="px-2 py-1 text-lg bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="ml-4 text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right mt-10">
              <p className="text-xl font-bold">
                Total: ${getTotal().toFixed(2)}
              </p>
              <button className="mt-4 px-6 py-3 bg-red-700 text-white rounded hover:bg-red-800">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>);
};

export default CartPage;
