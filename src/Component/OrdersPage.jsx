import { useEffect, useState } from "react";
import { BadgeCheck, Package, Truck, XCircle } from "lucide-react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?._id) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`);
        const data = await res.json();
        console.log(" order data:", data);
        const userOrders = data.filter(order => order.user._id === user._id);
        setOrders(userOrders);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };


    const fetchCoupons = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/coupon/usage`);
        const data = await res.json();
        console.log("data:", data);
        setCoupons(data);

      } catch (err) {
        console.error("Error fetching coupons:", err);
      }
    };



    fetchOrders();
    fetchCoupons();
  }, []);

  if (!user) {
    return <p className="p-6 text-center">Please login to view your orders.</p>;
  }


  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return (
          <span className="flex items-center gap-1 text-green-600 font-semibold">
            <BadgeCheck className="w-4 h-4" /> Delivered
          </span>
        );
      case "Shipped":
        return (
          <span className="flex items-center gap-1 text-blue-600 font-semibold">
            <Truck className="w-4 h-4" /> Shipped
          </span>
        );
      case "Pending":
        return (
          <span className="flex items-center gap-1 text-yellow-600 font-semibold">
            <Package className="w-4 h-4" /> Pending
          </span>
        );
      case "Cancelled":
        return (
          <span className="flex items-center gap-1 text-red-600 font-semibold">
            <XCircle className="w-4 h-4" /> Cancelled
          </span>
        );
      default:
        return status;
    }
  };

  return (
    <div className="bg-gradient-to-t to-black">
      <div className="max-w-6xl mx-auto p-6 ">
        <h1 className="text-3xl font-bold mb-8 text-white">My Orders</h1>
        {orders.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-lg">😕 You don’t have any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-8 ">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                    <p className="text-sm text-gray-500">
                      Placed on: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">{getStatusBadge(order.status)}</div>
                </div>
                {/* Order Items */}
                <div className="divide-y">
                  {order.items.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 py-4">
                      <img
                        src={item.product?.imageUrl}
                        alt={item.product?.name}
                        className="w-20 h-20 object-contain rounded border"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.product?.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">₹{item.product?.price}</p>
                        <p className="text-sm text-gray-500">
                          Total: ₹{item.quantity * item.product?.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

               
                {/* Grand Total + Coupons + Button */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 pt-4 border-t gap-4">
                  {/* Left side: Grand Total */}
                  <p className="font-bold text-lg text-gray-800">
                    Grand Total: ₹{order.total}
                  </p>

                  {/* Middle: Applied Coupons */}
                  <div>
                    {coupons
                      .filter((c) => {
                        // Compare order IDs safely
                        const couponOrderId = c.orderId?._id || c.orderId;
                        return String(couponOrderId) === String(order._id);
                      })
                      .map((c) => (
                        <div key={c._id} className="text-sm text-gray-600 mb-2">
                          <p>
                            Coupon Code: <span className="font-semibold">{c.code}</span>
                          </p>
                          <p>Total Before Discount:<span className="font-semibold">{c.totalBeforeDiscount}</span></p>
                          <p>
                            Discount: <span className="font-semibold">₹{c.discountAmount.toFixed(2) || c.discountValue}</span>
                          </p>
                          <p>
                            Total After Discount:{" "}
                            <span className="font-semibold">₹{c.totalAfterDiscount || order.total}</span>
                          </p>
                        </div>
                      ))}
                  </div>

                  {/* View Details Button */}
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                    View Details
                  </button>
                </div>

              </div>

            ))}
          </div>
        )}
      </div>
    </div>);
};

export default OrdersPage;