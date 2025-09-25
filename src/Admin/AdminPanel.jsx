import React, { useState, useEffect, } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import UsersList from "./UserList";
import { User, LayoutDashboard, ShoppingBasket, SquarePlus, ShoppingBag, UserStar, MessagesSquare } from "lucide-react";
import MonthlyOrderChart from "./Charts/MonthlyOrderChart";
import MonthlyProfitChart from "./Charts/MonthlyProfitChart";
import { useNavigate } from "react-router-dom";
// import MonthlyUserChart from "./Charts/MonthlyUserChart";
// import CatagoryPieChart from "./Charts/CatagoryPieChart";



const AdminPanel = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [massage,setmassage]=useState([])
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminEmail");
    navigate("/admin-login");
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchOrders();
      } else {
        console.error("Failed to update order status");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const fetchProducts = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/products`);
    const data = await res.json();
    setProducts(data);
  };

  const fetchOrders = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`);
    const data = await res.json();
    setOrders(data);
  };

  const fetchUsers = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users`);
    const data = await res.json();
    console.log("user fetched:", data);
    setUsers(data);
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}`);
      const data = await res.json();
      setSelectedOrder(data);
    } catch (err) {
      console.error("Error fetching order details:", err);
    }
  };

  const fetchContectDetails=async ()=>{
    try{

      const res=await fetch(`${import.meta.env.VITE_API_URL}/api/auth/massage`)
      const data=await res.json()
      setmassage(data)
    }catch(err){
        console.error("Error fetching order details:", err);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchUsers();
    fetchContectDetails()
  }, []);

  // Calculate profit
  const totalProfit = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <h1 className="text-2xl font-bold p-6 border-b border-gray-700">Admin Panel</h1>
        <nav className="flex-1 p-4 space-y-2">

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 p-2 rounded transition 
        ${activeTab === "dashboard" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            <LayoutDashboard className="w-5 h-5 text-indigo-500" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center gap-3 p-2 rounded transition 
        ${activeTab === "products" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            <ShoppingBasket className="w-5 h-5 text-indigo-500" />
            <span>Products</span>
          </button>

          <button
            onClick={() => setActiveTab("addProduct")}
            className={`w-full flex items-center gap-3 p-2 rounded transition 
        ${activeTab === "addProduct" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            <SquarePlus className="w-5 h-5 text-indigo-500" />
            <span>Add Product</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center gap-3 p-2 rounded transition 
        ${activeTab === "orders" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            <ShoppingBag className="w-5 h-5 text-indigo-500" />
            <span>Orders</span>
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`w-full flex items-center gap-3 p-2 rounded transition 
        ${activeTab === "users" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            <User className="w-5 h-5 text-indigo-500" />
            <span>Users</span>
          </button>

          <button
            onClick={() => setActiveTab("Contect")}
            className={`w-full flex items-center gap-3 p-2 rounded transition 
        ${activeTab === "orders" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            <MessagesSquare className="w-5 h-5 text-indigo-500" />
            <span>Massage</span>
          </button>

        </nav>
      </div>


      {/* Main Content */}
      <div className="flex-1 p-8 bg-black">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className=" text-white text-2xl font-bold capitalize">{activeTab}</h2>
          <div className="flex gap-5 " >
            <UserStar className="w-8 h-10" />
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Logout</button>
          </div>
        </div>
        {/* Content */}
        {activeTab === "dashboard" && (<>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-400 p-4 rounded shadow">
              <h3 className="font-bold">Total Products</h3>
              <p className="text-2xl">{products.length}</p>
            </div>
            <div className="bg-gray-400 p-4 rounded shadow">
              <h3 className="font-bold">Total Orders</h3>
              <p className="text-2xl">{orders.length}</p>
            </div>
            <div className="bg-gray-400 p-4 rounded shadow">
              <h3 className="font-bold">Total Users</h3>
              <p className="text-2xl">{users.length}</p>
            </div>
            <div className="bg-gray-400 p-4 rounded shadow">
              <h3 className="font-bold">Total Profit</h3>
              <p className="text-2xl">₹{totalProfit}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-10">

            <div className="bg-gradient-to-b from-gray-50 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-blue-600 mb-4 border-b pb-2">Total Profit</h3>
              <MonthlyProfitChart orders={orders} width="100%" height={300} />
            </div>
            <div className="bg-gradient-to-b from-gray-50 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-green-600 mb-4 border-b pb-2">Monthly Orders</h3>
              <MonthlyOrderChart orders={orders} width="100%" height={300} />
            </div>


            {/* <div className="bg-gradient-to-b from-gray-50 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-purple-600 mb-4 border-b pb-2">Product Categories</h3>
              <CatagoryPieChart products={products} />
            </div> */}

            {/*             
            <div className="bg-gradient-to-b from-gray-50 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-yellow-600 mb-4 border-b pb-2">Total Users</h3>
              <MonthlyUserChart users={users} />
            </div> */}
          </div>



        </>)}

        {activeTab === "products" && (
          <ProductList products={products} refreshProducts={fetchProducts} />
        )}

        {activeTab === "addProduct" && (
          <ProductForm refreshProducts={fetchProducts} />
        )}

        {activeTab === "orders" && (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold mb-4">Orders List</h3>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">User</th>
                  <th className="border p-2">Total</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Action</th>
                  <th className="border p-2">Order Details</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="border p-2">{order._id}</td>
                    <td className="border p-2">{order.userName || "N/A"}</td>
                    <td className="border p-2">₹{order.total}</td>
                    <td className="border p-2">{order.status}</td>
                    <td className="border p-2">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)} className="border rounded px-2 py-1">
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cencelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => fetchOrderDetails(order._id)}
                        className="text-blue-600 hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

           
            {selectedOrder && (
              <div className="mt-6 p-4 border rounded bg-gray-50">
                <h4 className="text-lg font-bold mb-2">Order Details</h4>
                <p><strong>User:</strong> {selectedOrder.user?.name || selectedOrder.userName} ({selectedOrder.user?.email})</p>
                <p><strong>Total:</strong> ₹{selectedOrder.total}</p>
                <p><strong>Status:</strong> {selectedOrder.status}</p>

                <h5 className="mt-4 font-semibold">Items:</h5>
                <ul className="list-disc ml-6">
                  {selectedOrder.items?.map((item, idx) => (
                    <li key={idx}>
                      {item.product?.name || "Product"} × {item.quantity} = ₹
                      {(item.product?.price * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}


        {activeTab === "Contect" && (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold mb-4">Orders List</h3>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">FirstName</th>
                  <th className="border p-2">LastName</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Massage</th>
                </tr>
              </thead>
              <tbody>
                {massage.map((msg) => (
                  <tr key={msg._id}>
                    <td className="border p-2">{msg.firstName}</td>
                    <td className="border p-2">{msg.lastName || "N/A"}</td>
                    <td className="border p-2">{msg.email}</td>
                    <td className="border p-2">{msg.message}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "users" && (
          <UsersList users={users} />
        )}
      </div>
    </div>
  );
};
export default AdminPanel;
