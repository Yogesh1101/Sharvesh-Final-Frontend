const initalState = {
  cart: [],
};

const cartReducer = (state = initalState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // check if the item is already in the cart
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        // if it is in the cart, remove it
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== existingItem),
        };
      } else {
        // if it is not in the cart, add it with a quantity of 1
        const newItem = { ...action.payload, quantity: 1 };
        return { ...state, cart: [...state.cart, newItem] };
      }

    case "REMOVE_FROM_CART":
      // Remove the item from the cart
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "INCREMENT_QUANTITY":
      // Increasing the quantity of the particular item in the cart
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };

    case "DECREMENT_QUANTITY":
      // Decreasing the quantity of the particular item in the cart
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload) {
            const newQuantity = Math.max(1, item.quantity - 1); 
            return { ...item, quantity: newQuantity };
          }
          return item;
        }),
      };

    default:
      return state;
  }
};

export default cartReducer;
