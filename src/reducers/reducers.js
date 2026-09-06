// src/reducers/rootReducer.js

const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
const storedQuantities = JSON.parse(localStorage.getItem("quantities")) || [];

const initialState = {
  cart: storedCart,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const payload = action.payload;

      // Agar payload mein size nahi hai toh 'OS' (One Size) daal do
      const size = payload.size || "OS";
      const id = payload.id;

      // 🔥 CHECK: Kya same product ki same size pehle se cart mein hai?
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === id && item.size === size
      );

      let updatedCartAdd;

      if (existingProductIndex >= 0) {
        // Agar same size pehle se hai, toh sirf quantity +1 karo
        updatedCartAdd = state.cart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        // Agar naya size hai, toh naya item add karo (S, M, L alag-alag)
        const newItem = { ...payload, size, quantity: payload.quantity || 1 };
        updatedCartAdd = [...state.cart, newItem];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCartAdd));
      return {
        ...state,
        cart: updatedCartAdd,
      };
    }

    case "REMOVE_FROM_CART": {
      const updatedCartRemove = state.cart.filter(
        (_, index) => index !== action.payload
      );
      const updatedQuantitiesRemove = storedQuantities.filter(
        (_, index) => index !== action.payload
      );

      localStorage.setItem("cart", JSON.stringify(updatedCartRemove));
      localStorage.setItem("quantities", JSON.stringify(updatedQuantitiesRemove));

      return {
        ...state,
        cart: updatedCartRemove,
      };
    }

    default:
      return state;
  }
};

export default rootReducer;