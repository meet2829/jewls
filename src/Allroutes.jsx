import React from 'react'
import {
    Routes,
    Route
} from "react-router-dom";
import Home from './Component/Home';
import Blog from './Component/Blog';
import Aboutus from './Component/Aboutus';
import Contactus from './Component/Contactus';
import Shop from './Component/Shop';
import AuthForm from './Component/AuthForm';

const Allroutes = () => {
  return (
    <div>
        
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/aboutus' element={<Aboutus />}></Route>
            <Route path='/blog' element={<Blog />}></Route>
            <Route path='/contactus' element={<Contactus />}></Route>
            <Route path='/shop' element={<Shop />}></Route>
            <Route path='/login' element={<AuthForm />}></Route>
        </Routes>
      
    </div>
  )
}

export default Allroutes
