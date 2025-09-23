import { useState, useEffect } from 'react'
import './App.css'
import Allroutes from './Allroutes'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  return (
    <div className="font-[Poppins]">
      <Allroutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  )
}

export default App
