import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultItem = {
  items: [],
  totalAmount: 0,
}

const CartReducer = (state, action) => {
  // Add item onn the cart
  if(action.type === "ADD_ITEM") {

    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if(existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    const newTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: newTotalAmount
    }
  }
  
  // Remove item on the cart
  if(action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item);
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if(existingCartItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.item);
    } else {
      const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  
  // Clear cart after a successful order
  if(action.type === "CLEAR_CART") {
    return defaultItem;
  }

  return defaultItem;
}

const CartProvider = props => {

  const [cartStateSnapShot, dispatchCartAction] = useReducer(CartReducer, defaultItem);

  const addItemToCartHandler = item => {
    dispatchCartAction({
      type: "ADD_ITEM",
      item: item
    });
  }

  const removeItemFromCartHandler = id => {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      item: id
    });
  }

  const clearCartHandler = () => {
    dispatchCartAction({
      type: "CLEAR_CART"
    });
  }

  const cartContext = {
    items: cartStateSnapShot.items,
    totalAmount: cartStateSnapShot.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  }

  return <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>;
}

export default CartProvider;