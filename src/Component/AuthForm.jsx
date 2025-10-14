import React, { useState } from "react";
import axios from "axios";
import loginbg from "../assets/Login-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess, registerSuccess } from "../Redux/Slices/authSlice";

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: "", email: "", password: "" });
    setStep(1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    try {
      if (isSignUp && step === 1) {
        // Step 1: Send OTP
        await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, { email });
        toast.success("OTP sent to your email", { transition: Bounce });
        setStep(2);
      } else if (isSignUp && step === 2) {
        // Step 2: Verify OTP and Register
        await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, { email, otp });
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
          name,
          email,
          password,
        });

        dispatch(registerSuccess(res.data.user)); // 👈 save in Redux
        toast.success("Registered successfully", { transition: Bounce });
        navigate("/");
      } else {
        // Regular Login
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
          email,
          password,
        });

        dispatch(loginSuccess(res.data.user)); // 👈 save in Redux
        toast.success("Logged in successfully", { transition: Bounce });
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast.error("Authentication failed", { transition: Bounce });
    }
  };

  return (
    <div
      className="min-h-screen bg-contain bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${loginbg})` }}
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

      {/* Glassy Auth Form */}
      <div className="relative z-10 w-full max-w-sm p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignUp && (
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Enter The Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isSignUp && step === 2 && (
            <div>
              <label className="block text-sm mb-1">Enter OTP</label>
              <input
                type="text"
                name="otp"
                className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            {isSignUp ? (step === 2 ? "Verify & Register" : "Send OTP") : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-white/80">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            onClick={handleToggle}
            className="ml-1 text-white font-semibold underline hover:text-gray-200"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
          <p><Link to={"/forgot-password"}>Forgotten your Password?</Link></p>
        </p>
      </div>
    </div>
  );
};
export default AuthForm;