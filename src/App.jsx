import { useState,useEffect } from 'react'
import './App.css'
import Allroutes from './Allroutes'
import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
  AOS.init({ duration: 3000 });
}, []);

  return (
    <div className="font-[Poppins]">
    <Allroutes />
    </div>
  )
}

export default App
