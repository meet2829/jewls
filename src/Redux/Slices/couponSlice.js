import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Apply Coupon
export const applyCoupon = createAsyncThunk(
  "coupons/applyCoupon",
  async ({ code, token }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/coupons/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code }),
    });
    return await res.json();
  }
);

// Fetch All Coupons (Admin)
export const fetchCoupons = createAsyncThunk(
  "coupons/fetchCoupons",
  async (token) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/coupons`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  }
);

const couponSlice = createSlice({
  name: "coupons",
  initialState: {
    items: [],
    appliedCoupon: null,
    discount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCoupon: (state) => {
      state.appliedCoupon = null;
      state.discount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.appliedCoupon = action.payload.coupon;
        state.discount = action.payload.discount;
      });
  },
});

export const { clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;
