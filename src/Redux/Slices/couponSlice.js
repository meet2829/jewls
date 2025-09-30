import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Apply Coupon
export const applyCoupon = createAsyncThunk(
  "coupons/applyCoupon",
  async ({ code, token }) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/coupons/apply`,
      { code },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
);


// Fetch All Coupons (Admin)
export const fetchCoupons = createAsyncThunk(
  "coupons/fetchCoupons",
  async (token) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/coupons`,
      {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      }
    );
    return data;
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
