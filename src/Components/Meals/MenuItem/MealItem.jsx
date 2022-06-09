import { useContext } from 'react';
import MealItemForm from './MealItemForm';
import CartContext from '././../../../store/cart-context';
import classes from '../MenuItem/MealItem.module.css';

function MealItem(props) {

  const cartCxts = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCxts.addItem(
      {
        id: props.id,
        name: props.name,
        price: props.price,
        amount: amount
      }
    )
  }

  return (
    <li className="meal">
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
        <div>
          <MealItemForm onAddToCart={addToCartHandler}/>
        </div>
      </div>
      <br />
      <hr />
      <br />
    </li>
  );
}

export default MealItem;
