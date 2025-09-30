import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Start Payment
export const initiatePayment = createAsyncThunk(
  "payment/initiatePayment",
  async ({ orderId, token }) => {
     const { data } =await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/initiate`, {orderId},
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data
  }
);

// Verify Payment
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async ({ paymentData, token }) => {
    const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/payment/verify`, paymentData,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    status: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default paymentSlice.reducer;
