import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "././../../store/cart-context";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";

function Cart(props) {

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCxts = useContext(CartContext);

  const totalAmount = `#${cartCxts.totalAmount.toFixed(2)}`;
  const hasItems = cartCxts.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCxts.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCxts.addItem({
      ...item,
      amount: 1
    });
  };

  const orderHandler = () => {
    setIsCheckingOut(true);
  };
  
  // Submit orders to firebase
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://afrikitchen-bc387-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCxts.items
      })
    })
    setIsSubmitting(false);
    setDidSubmit(true);
    // Calling the clear cart function from the cart-context
    cartCxts.clearCart();
  };

  // Items in the cart waiting for order
  const cartItems = (
    <ul className={classes["cart-items"]}>
     {cartCxts.items.map(item => (
       <CartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd={cartItemAddHandler.bind(null, item)}
       />
     ))}
    </ul>
  );
  
  // To keep the return div cleaned up
  const modalActions = (
  <div className={classes.actions}>
  <button className={classes["button--alt"]} onClick={props.onClose}>
    Close
  </button>
  {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
  </div>
  );

  const cartModalContent = <React.Fragment>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount:</span>
      <span>{totalAmount}</span>
    </div>
    {isCheckingOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
    {!isCheckingOut && modalActions}
  </React.Fragment>

  // Sending order to the server message
  const isSubmittingModalContent = <p>Sending your order...</p>
  // Order message and closing the modal
  const didSubmitModalContent = <React.Fragment>
    <p>Your order has been submitted successfully, your meal will be deliver to the entered address when it is ready.</p>
    <p>Thank you for your order.</p>
    <button className={classes.buttons} onClick={props.onClose}>
      Close
    </button>
  </React.Fragment>
 
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
}

export default Cart;
