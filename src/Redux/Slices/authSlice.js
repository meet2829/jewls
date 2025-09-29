// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const saveUser = (user) => {
  if (user) localStorage.setItem("user", JSON.stringify(user));
  else localStorage.removeItem("user");
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: loadUser(),
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      saveUser(action.payload);
    },
    logout: (state) => {
      state.user = null;
      saveUser(null);
    },
    registerSuccess: (state, action) => {
      state.user = action.payload;
      saveUser(action.payload);
    },
  },
});

export const { loginSuccess, logout, registerSuccess } = authSlice.actions;
export default authSlice.reducer;
