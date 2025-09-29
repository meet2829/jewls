import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create Order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ orderData, token }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    return await res.json();
  }
);

// Fetch User Orders
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (token) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/my-orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  }
);

// Fetch All Orders (Admin)
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (token) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default orderSlice.reducer;
