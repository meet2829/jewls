import { useState, useEffect } from 'react'
import './App.css'
import Allroutes from './Allroutes'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from './Redux/store';
import Navbar from './Component/Navbar';



function App() {

  useEffect(() => {
    AOS.init({ duration: 3000 });
  }, []);

  return (
    <div className="font-[Poppins]">
      <Provider store={store}>
        <Navbar />
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
      </Provider>
    </div>
  )
}

export default App
