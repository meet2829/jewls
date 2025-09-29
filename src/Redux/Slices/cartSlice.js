// src/redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: initialCart,
    discount: 0,
    couponCode: "",
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { id, amount } = action.payload;
      const item = state.items.find((i) => i._id === id);
      if (item) {
        item.quantity = Math.max(1, item.quantity + amount);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
    applyDiscount: (state, action) => {
      const { discount, code } = action.payload;
      state.discount = discount;
      state.couponCode = code;
    },
    resetDiscount: (state) => {
      state.discount = 0;
      state.couponCode = "";
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyDiscount,
  resetDiscount,
} = cartSlice.actions;

export default cartSlice.reducer;
