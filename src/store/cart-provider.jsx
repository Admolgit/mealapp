import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultItem = {
  items: [],
  totalAmount: 0,
}

const CartReducer = (state, action) => {
  if(action.identifier === "ADD_ITEM") {
    const newItems = state.items.concat(action.item);
    const newTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    return {
      items: newItems,
      totalAmount: newTotalAmount
    }
  }
  return defaultItem;
}

const CartProvider = props => {

  const [cartStateSnapShot, dispatchCartAction] = useReducer(CartReducer, defaultItem);

  const addItemToCartHandler = item => {
    dispatchCartAction({
      identifier: "ADD_ITEM",
      payload: item
    });
  }

  const removeItemFromCartHandler = id => {
    dispatchCartAction({
      identifier: "REMOVE_ITEM",
      payload: id
    });
  }

  const cartContext = {
    items: cartStateSnapShot.items,
    totalAmount: cartStateSnapShot.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  }

  return <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>;
}

export default CartProvider;