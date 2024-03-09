import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  cart: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      console.log(action.payload, ">>>");
    },
    logoutUser: (state, action) => {
      state.user = {};
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
    },

    addToCart: (state, { payload }) => {
      const check = state.cart.findIndex((el) => el._id === payload._id);

      if (check >= 0) {
        state.cart[check].cartQuantity += 1;
      } else {
        state.cart.push({
          ...payload,
          cartQuantity: 1,
        });
      }
      state.totalQuantity += 1;
    },
    removeFromCart: (state, { payload }) => {
      const check = state.cart.findIndex((el) => el._id === payload._id);

      if (state.cart[check].cartQuantity > 1) {
        state.cart[check].cartQuantity -= 1;
      } else {
        state.cart = state.cart.filter((el) => el._id !== payload._id);
      }

      state.totalQuantity -= 1;
    },
    remove: (state, { payload }) => {
      state.cart = state.cart.filter((el) => el._id !== payload._id);
    },
  },
});

export const {
  loginUser,
  logoutUser,
  addToCart,
  clearCart,
  removeFromCart,
  remove,
} = usersSlice.actions;

export default usersSlice;
