export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const RESET_CART = "RESET_CART";

export const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return addItemToCart(action.product, state);
    case REMOVE_ITEM:
      return removeItemFromCart(action.itemId, state);
    case DELETE_ITEM:
      return deleteItemFromCart(action.itemId, state);
    case RESET_CART:
      return resetCart();
    default:
      return state;
  }
};

const addItemToCart = (product, state) => {
  const updatedTotalAmount = state.totalAmount + product.price;

  const updatedCart = [...state.cart];

  const updatedItemIndex = updatedCart.findIndex(
    (item) => item.id === product.id
  );

  if (updatedItemIndex < 0) {
    updatedCart.push({ ...product, quantity: 1, amount: product.price });
  } else {
    const updatedItem = { ...updatedCart[updatedItemIndex] };
    updatedItem.quantity++;
    updatedItem.amount = updatedItem.price * updatedItem.quantity;
    updatedCart[updatedItemIndex] = updatedItem;
  }

  return { ...state, cart: updatedCart, totalAmount: updatedTotalAmount };
};

const removeItemFromCart = (itemId, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex((item) => item.id === itemId);
  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };

  const updatedTotalAmount = state.totalAmount - updatedItem.price;

  updatedItem.quantity--;
  updatedItem.amount = updatedItem.price * updatedItem.quantity;
  if (updatedItem.quantity <= 0) {
    updatedCart.splice(updatedItemIndex, 1);
  } else {
    updatedCart[updatedItemIndex] = updatedItem;
  }

  return { ...state, cart: updatedCart, totalAmount: updatedTotalAmount };
};

const deleteItemFromCart = (itemId, state) => {
  const updatedCart = [...state.cart];
  const updatedItemIndex = updatedCart.findIndex((item) => item.id === itemId);

  //Deduct total amount
  const updatedItem = {
    ...updatedCart[updatedItemIndex],
  };
  const updatedTotalAmount =
    state.totalAmount - updatedItem.price * updatedItem.quantity;

  //Delete from cart state
  updatedCart.splice(updatedItemIndex, 1);

  return { ...state, cart: updatedCart, totalAmount: updatedTotalAmount };
};

const resetCart = () => {
  return { cart: [], totalAmount: 0 };
};
