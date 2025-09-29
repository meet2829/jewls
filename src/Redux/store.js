import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import productReducer from "./Slices/productSlice";
import orderReducer from "./Slices/orderSlice";
import couponReducer from "./Slices/couponSlice";
import paymentReducer from "./Slices/paymentSlice";
import cartReducer from "./Slices/cartSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    orders: orderReducer,
    coupons: couponReducer,
    payment: paymentReducer,
    cart: cartReducer,
  },
});
