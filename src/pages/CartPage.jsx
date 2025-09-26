import React, { useEffect, useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import Navbar from '../Component/Navbar';

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


 const handleCheckout = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!user?._id) {
      toast.warn("Please login to place order");
      return;
    }

    // Step 1: Create Razorpay order from backend
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: getTotal() }),
      }
    );

    const order = await response.json();

    //  Razorpay options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // add in your .env
      amount: order.amount,
      currency: order.currency,
      name: "My Jewellery Store",
      description: "Order Payment",
      order_id: order.id,
      handler: async function (paymentResponse) {
        // ✅ Payment successful → Save order in DB
        await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: user._id,
            userName: user.name,
            items: cart.map((item) => ({
              product: item._id,
              quantity: item.quantity,
              imageUrl: item.imageUrl
            })),
            total: getTotal(),
            paymentId: paymentResponse.razorpay_payment_id, // save payment ID
          }),
        });
        

        toast.success("Payment successful & Order placed!");
        localStorage.removeItem("cart");
        setCart([]);
      },
      theme: { color: "#D32F2F" },
    };

    // Step 3: Open Razorpay checkout popup
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (err) {
    console.error("Checkout error:", err);
    toast.error("Something went wrong with payment");
  }
};



  return (
    <div>

     <Navbar />


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
                      {item.price.toFixed(2)} × {item.quantity}
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
                Total: ₨. {getTotal().toFixed(2)}
              </p>
              <button
                onClick={handleCheckout}
                className="mt-4 px-6 py-3 bg-red-700 text-white rounded hover:bg-red-800"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>);
};

export default CartPage;
