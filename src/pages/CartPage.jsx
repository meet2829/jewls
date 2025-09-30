import  { useEffect, useState } from 'react';
import {  toast } from 'react-toastify';
import Navbar from '../Component/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartPage = () => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getTotalAfterDiscount = () => getTotal() - discount;

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

  const applyCoupon = async () => {
    if (!couponCode) {
      toast.warn("Please enter a coupon code");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?._id) {
        toast.warn("Please login to apply coupon");
        return;
      }

      const totalBeforeDiscount = getTotal();
      let discountAmount = 0;

      // Step 1: Apply coupon using Axios
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/coupon/apply`,
        {
          code: couponCode,
          userId: user._id,
          amount: totalBeforeDiscount
        }
      );

      // Calculate discount
      if (data.discountType === "percentage") {
        discountAmount = totalBeforeDiscount * (data.discountValue / 100);
      } else {
        discountAmount = data.discountValue;
      }

      const totalAfterDiscount = Math.max(totalBeforeDiscount - discountAmount, 0);

      // Update UI
      setDiscount(discountAmount);
      toast.success(`Coupon applied! Discount: ₨. ${discountAmount.toFixed(2)}`);

      // Step 2: Track usage (commented out as in original)
      // await axios.post(`${import.meta.env.VITE_API_URL}/api/coupon/track-usage`, {
      //   code: couponCode,
      //   userId: user._id,
      //   totalBeforeDiscount,
      //   discountAmount,
      //   totalAfterDiscount,
      // });

    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong while applying coupon");
      }
      setDiscount(0);
    }
  };

  const handleCheckout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (!user?._id) {
        toast.warn("Please login to place order");
        navigate("/login");
        return;
      }

      const totalAfterDiscount = getTotalAfterDiscount();
      
      // Step 1: Create order first (before payment) using Axios
      const { data: orderData } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          user: user._id,
          userName: user.name,
          items: cart.map((item) => ({
            product: item._id,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
            name: item.name,
            price: item.price
          })),
          total: totalAfterDiscount,
          couponCode: couponCode,
          discountAmount: discount
        }
      );

      const createdOrder = orderData.order;

      // Step 2: Create Razorpay order using Axios
      const { data: paymentOrder } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
        {
          orderId: createdOrder._id,
          amount: totalAfterDiscount,
          currency: "INR"
        }
      );

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: paymentOrder.amount,
        currency: "INR",
        name: "My Jewellery Store",
        description: `Order #${createdOrder._id}`,
        order_id: paymentOrder.id,
        handler: async function (paymentResponse) {
          try {
            // Step 3: Update order payment status to paid using Axios
            await axios.put(
              `${import.meta.env.VITE_API_URL}/api/orders/${createdOrder._id}/payment`,
              {
                paymentId: paymentResponse.razorpay_payment_id,
                paymentStatus: 'paid'
              }
            );

            // Step 4: Track coupon usage with the actual orderId using Axios
            if (couponCode && discount > 0) {
              await axios.post(
                `${import.meta.env.VITE_API_URL}/api/coupon/track-usage`,
                {
                  code: couponCode,
                  userId: user._id,
                  orderId: createdOrder._id,
                  totalBeforeDiscount: getTotal(),
                  discountAmount: discount,
                  totalAfterDiscount: totalAfterDiscount,
                }
              );
            }

            toast.success("Payment successful & Order placed!");
            localStorage.removeItem("cart");
            setCart([]);
            setDiscount(0);
            setCouponCode("");

          } catch (err) {
            console.error("Error updating order:", err);
            if (err.response?.data?.message) {
              toast.error(err.response.data.message);
            } else {
              toast.error("Something went wrong after payment");
            }
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: { color: "#D32F2F" },
      };

      // Step 5: Open Razorpay checkout popup
      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error("Checkout error:", err);
      
      // Delete the created order if payment order creation fails
      if (err.config?.url?.includes('/api/payment/create-order')) {
        try {
          const orderId = JSON.parse(err.config.data).orderId;
          await axios.delete(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}`);
        } catch (deleteErr) {
          console.error("Error deleting order:", deleteErr);
        }
      }

      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong with payment");
      }
    }
  };

  return (
    <div>
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

            <div className="mt-6 flex gap-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="px-4 py-2 border rounded flex-1"
              />
              <button
                onClick={applyCoupon}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Apply
              </button>
            </div>

            <div className="text-right mt-10">
              <p className="text-xl font-bold">
                Total: ₨. {getTotalAfterDiscount().toFixed(2)}
              </p>
              {discount > 0 && (
                <p className="text-green-600 font-semibold">
                  Discount Applied: -₨. {discount.toFixed(2)}
                </p>
              )}
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
    </div>
  );
};

export default CartPage;