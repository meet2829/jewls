import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create Order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ orderData, token }) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
);
// Fetch User Orders
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (token) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/orders/my-orders`,
      {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      }
    );
    return data;
  }
);

// Fetch All Orders (Admin)
export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (token) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/orders`,
      {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      }
    );
    return data;
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
