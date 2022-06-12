import React, { useState, useEffect } from "react";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';

function HeaderCardButton(props) {

  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);

  const cartCxts = useContext(CartContext);

  const { items } = cartCxts;
  
  // Reducing cart item into a single number
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount
  }, 0);

  // Cart button animation
  const btnClasses = `${classes.button} ${buttonIsHighlighted ? classes.bump : ""}`;

  // Cart button animation on add click event
  useEffect(() => {
    if(items.length === 0) {
      return;
    }
    setButtonIsHighlighted(true);

    const timer = setTimeout(() => {
      setButtonIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }

  }, [items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCardButton;
