// src/actions/action.js

export const addToCart = (product) => {
  // product mein size already aayega (S, M, L)
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};

export const removeFromCart = (index) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: index,
  };
};