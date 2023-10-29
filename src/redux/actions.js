export const addToCart = (product) => ({
  type: "ADD_TO_CART",
  payload: product,
});

export const removeFromCart = (productID) => ({
  type: "REMOVE_FROM_CART",
  payload: productID,
});

export const incrementQuantity = (productID) => ({
  type: "INCREMENT_QUANTITY",
  payload: productID,
});

export const decrementQuantity = (productID) => ({
  type: "DECREMENT_QUANTITY",
  payload: productID,
});
