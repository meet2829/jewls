1. Project Overview

The Jewellery Project is a full-stack web application that allows users to browse, manage, and purchase jewellery items online.
It includes both user features (shopping, checkout) and an admin panel (management dashboard).

🧩 Tech Stack

Frontend: React.js (UI/UX, components, routing)
Backend: Node.js + Express
Database: MongoDB (Mongoose)
Deployment: Render

🌐 Deployed URLs
Frontend: https://jewls.onrender.com
Backend: https://jewls-backend.onrender.com

2. Key Features
🛍️ User Features
Jewellery listing with images, names, prices, and descriptions
Add to Cart & Checkout system
User Authentication (Login/Signup)
Online Payment via Razorpay
Order confirmation and storage in database

⚙️ Admin Features
Product Management (Add / Edit / Delete jewellery items)
Order Management (View / Update status)
User Management (View registered users)
Contact Message Management
Dashboard with stats and charts (Products, Orders, Users, Profits)

3. Project Flow
User visits homepage → views jewellery list
User logs in or signs up
User adds products to cart
User proceeds to checkout (Razorpay payment)
Order is created and saved in database
Admin logs in → manages products, users, and orders
Orders can be tracked and updated via admin panel

4. Product & Cart Flow
🧱 Component: ProductCard.jsx

Responsibilities:
Displays individual jewellery items with:
Image, name, category, price, rating, SALE badge
Includes “Add to Cart” button

Add to Cart Flow:
User clicks “Add to Cart”
addToCart(product) (from cartUtils.js) executes

Function:
Fetches cart from localStorage
Checks if product exists:
✅ Exists → increases quantity
❌ Not found → adds new product (quantity: 1)
Saves updated cart to localStorage
Shows success toast (Product added 🛒)
📦 Result: Product saved in localStorage under key "cart".

🛒 Component: CartPage.jsx

Responsibilities:
Displays cart items
Updates quantities (+ / −)
Removes items
Shows total price
Handles checkout & payment

🧭 Flow: Load Cart
On mount (useEffect):

const savedCart = localStorage.getItem("cart");
setCart(savedCart ? JSON.parse(savedCart) : []);

Loads existing cart from localStorage.

🔢 Flow: Quantity Update
User clicks + or −
handleQuantityChange(productId, amount):
Finds product
Updates quantity (min = 1)
Updates state + saves to localStorage
📌 Result: Cart updates instantly in UI + localStorage.

❌ Flow: Remove Item
User clicks Remove
handleRemove(productId):
Filters out product
Updates state + localStorage
📌 Result: Item disappears from cart (UI + localStorage).

🈹 Make A Coupen Code (For Festival Vise ) For Discount
    User Apply The Coupen Code like (DIWALI50, VALENTINE15,etc)
    By Applying The Coupen User Get Discounte

🛍️ Create A Order Page 
    In order Page User Can See All His Past Order With Status (Pending , Shipped , Delivered , Cancelled)
    With Order Number, CreationDate, and all OrderDetails Including CoupenDetails

    In Order Page Add Cancel Button for Cancel A Order 

💳 Checkout & Payment (Razorpay)

Step 1: Validate User
Reads "user" from localStorage
If missing → toast.warn("Please login to place order")

Step 2: Create Razorpay Order
Sends POST → ${VITE_API_URL}/api/payment/create-order
Backend responds with id, amount, currency

Step 3: Open Razorpay Popup
Initializes Razorpay with:
key, amount, currency, order_id
success handler (after payment)


Step 4: Save Order in Database
On successful payment:

{
  "user": user._id,
  "userName": user.name,
  "items": [
    { "product": item._id, "quantity": item.quantity, "imageUrl": item.imageUrl }
  ],
  "total": getTotal(),
  "paymentId": "razorpay_payment_id"
}


POST → /api/orders
Backend stores order in MongoDB

Step 5: Clear Cart
localStorage.removeItem("cart")
setCart([])
toast.success("Payment successful & Order placed!")

📦 Result: Payment successful → Order saved → Cart cleared.

add Cancle funcnality for cancle the order 

5. Admin Panel
🧭 File: AdminPanel.jsx
🎯 Overview
A full-featured dashboard for the admin to manage:
Products
Orders
Users
Contact messages
Business insights (charts, totals)

🧠 State Variables
Variable	Purpose
selectedOrder	Stores current order for detailed view
activeTab	Controls visible section (dashboard, products, etc.)
products	List of products from backend
orders	All orders data
users	Registered users
massage	Contact form submissions

🔄 Data Fetching (useEffect)
Executed when component mounts:
fetchProducts() → GET /api/products/products
fetchOrders() → GET /api/orders
fetchUsers() → GET /api/auth/users
fetchContectDetails() → GET /api/auth/massage

📌 Result: All essential data loads when the admin opens the panel.

🧭 Sidebar Navigation
Tabs inside Admin Panel:
Dashboard → Overview stats + charts
Products → Product listing
Add Product → Add new jewellery item
Orders → Manage customer orders
Users → Manage registered users
Messages → View contact form data

🗂️ activeTab determines which section is visible.

🔐 Logout Flow
When admin clicks Logout:
localStorage.removeItem("isAdmin");
localStorage.removeItem("adminEmail");
navigate("/admin-login");


📌 Result: Session cleared → redirected to Admin Login page.

📦 Order Management
✅ Update Order Status
Admin selects status → sends:

PUT /api/orders/:orderId
{ "status": "Shipped" }


On success → refreshes order list.
🔍 View Order Details

Fetch order info:
GET /api/orders/:orderId
Displays full order details (user, items, total, status).
📌 Result: Admin can monitor, verify, and update orders easily.
📊 Dashboard Features

Displays quick stats:
Total Products
Total Orders
Total Users
Total Profit (sum of all order totals)
Includes visual charts:
MonthlyProfitChart
MonthlyOrderChart
📌 Result: Admin gets an instant overview of business performance.

💬 Contact Messages
Tab: Contect
Displays customer contact form submissions:
firstName, lastName, email, message

📌 Result: Admin can review and respond to user messages.

👥 User Management
Tab: Users
Renders UsersList component
Displays all registered users from backend

🔁 Data Lifecycle (Admin Panel)
flowchart TD
    A[Admin Login] --> B[AdminPanel Mount]
    B -->|Fetch| C[Products]
    B -->|Fetch| D[Orders]
    B -->|Fetch| E[Users]
    B -->|Fetch| F[Messages]
    D --> G[Update Order Status]
    G -->|PUT Request| D
    D --> H[View Order Details]
    H -->|GET Request| D
    B --> I[Dashboard Stats + Charts]
    B --> J[Sidebar Navigation]
    J --> C
    J --> D
    J --> E
    J --> F
    B --> K[Logout → Clear localStorage + Navigate]


✅ Final Summary
Users: Browse, add to cart, and pay securely.
Admin: Manage all data, view insights, and control platform activity.
System: Uses React (frontend) + Node/Express (backend) + MongoDB (database) with Razorpay payment and Render deployment.