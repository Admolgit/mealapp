import React from "react";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';

function HeaderCardButton(props) {

  const cartCxts = useContext(CartContext);

  const numberOfCartItems = cartCxts.items.reduce((curNumber, item) => {
    return curNumber + item.amount
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCardButton;
