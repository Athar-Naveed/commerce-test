"use client"
import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addInitialCartItems(state, action) {
      return action.payload;
    },
    add(state, action) {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(current(state)));
      } else {
        existingItem.quantity += action.payload.quantity;
        localStorage.setItem("cart", JSON.stringify(current(state)));
      }
    },
    remove(state, action) {
      const { id } = action.payload;
      const data = state.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(data));
      return data;
    },
    clearCart(state) {
      return [];
    },
    incrementQuantity(state, action) {
      const indexItem = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state[indexItem]?.quantity >= 1) {
        state[indexItem].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(current(state)));
      }
    },
    decrementQuantity: (state, action) => {
      const indexItem = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state[indexItem]?.quantity > 1) {
        state[indexItem].quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(current(state)));
      }
    },
  },
});

export const {
  addInitialCartItems,
  add,
  remove,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
