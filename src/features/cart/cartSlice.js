import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems(state, action) {
      state.cart.push(action.payload);
    },
    deleteItems(state, action) {
      state.cart = state.cart.filter(
        (items) => items.pizzaId !== action.payload,
      );
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((items) => items.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((items) => items.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0)
        cartSlice.caseReducers.deleteItems(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;

export const {
  clearCart,
  deleteItems,
  decreaseItemQuantity,
  increaseItemQuantity,
  addItems,
} = cartSlice.actions;

export const getCart = (state) => state.cart.cart;

export const getTotalquantity = (state) =>
  state.cart.cart.reduce((acc, crr) => acc + crr.quantity, 0);

export const getTotalprice = (state) =>
  state.cart.cart.reduce((acc, crr) => acc + crr.totalPrice, 0);

export const getQuantityById = (id) => (state) =>
  state.cart.cart.find((items) => items.pizzaId === id)?.quantity ?? 0;
