import React, { useState } from 'react'
import {
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import Aboutus from './pages/Aboutus';
import Blog from './pages/Blog';
import Shop from './pages/Shop';
import Contactus from './pages/Contactus';
import CartPage from './pages/CartPage';
import AuthForm from './Component/AuthForm';
import ProductDetail from './pages/ProductDetail';
import AdminPanel from './Admin/AdminPanel';
import OrdersPage from './Component/OrdersPage';
import ProtectedRoute from './Component/utils/ProtectedRoute';
import AdminLogin from './Component/AdminLogin';


const Allroutes = () => {


  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/aboutus' element={<Aboutus />}></Route>
        <Route path='/blog' element={<Blog />}></Route>
        <Route path='/contactus' element={<Contactus />}></Route>
        <Route path='/shop' element={<Shop />}></Route>
        <Route path='/Cartpage' element={<CartPage />}></Route>
        <Route path='/login' element={<AuthForm />}></Route>
        <Route path='/product/:id' element={<ProductDetail />}></Route>
        <Route path='/admin-login' element={<AdminLogin />}></Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route path='/orders' element={<OrdersPage />}></Route>
      </Routes>
    </div>
  )
}

export default Allroutes
