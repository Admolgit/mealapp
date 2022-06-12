import { useContext } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "././../../store/cart-context";
import classes from "./Cart.module.css";

function Cart(props) {
  const cartCxts = useContext(CartContext);

  const totalAmount = `$${cartCxts.totalAmount.toFixed(2)}`;
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

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCxts.items.map((item) => (
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
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount:</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
