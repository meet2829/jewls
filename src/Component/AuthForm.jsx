import React, { useState } from 'react';
import axios from 'axios';
import loginbg from '../assets/Login-bg.jpg'

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { name, email, password } = formData;
    const url = isSignUp
      ? "http://localhost:8080/register"
      : "http://localhost:8080/login";

    axios.post(url, { name, email, password })
      .then(res => {
        console.log(res.data);
        alert(`${isSignUp ? 'Registered' : 'Logged in'} successfully`);
      })
      .catch(err => {
        console.error(err);
        alert("Something went wrong");
      });
  };

  return (
    <div className="min-h-screen bg-contain bg-center flex items-center justify-center relative " style={{ backgroundImage: `url(${loginbg})` }}>
      {/* Background overlay with blur */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

      {/* Glassy Auth Form */}
      <div className="relative z-10 w-full max-w-sm p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
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
          <button
            type="submit"
            className="w-full py-2 px-4 bg-white text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            {isSignUp ? 'Create Account' : 'Log In'}
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-white/80">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button
            type="button"
            onClick={handleToggle}
            className="ml-1 text-white font-semibold underline hover:text-gray-200"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
