import MealItemForm from './MealItemForm';
import classes from '../MenuItem/MealItem.module.css';

function MealItem(props) {

  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className="meal">
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
        <div>
          <MealItemForm />
        </div>
      </div>
      <br />
      <hr />
      <br />
    </li>
  );
}

export default MealItem;
