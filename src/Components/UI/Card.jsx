import classes from './Card.module.css'

function Card(props) {
  return <div className={classes.card}>{props.Card}</div>
}

export default Card