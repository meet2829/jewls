import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Start Payment
export const initiatePayment = createAsyncThunk(
  "payment/initiatePayment",
  async ({ orderId, token }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/initiate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderId }),
    });
    return await res.json();
  }
);

// Verify Payment
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async ({ paymentData, token }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    });
    return await res.json();
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
