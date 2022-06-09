import Input from "../../UI/Input";
import { useRef, useState } from "react";
import "./MealItemForm.css";

function MealItemForm(props) {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const inputAmountRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = inputAmountRef.current.value;

    const amountNumber = +amount;

    if (amount.trim().length === 0 || amountNumber < 1 || amountNumber > 5) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(amountNumber);
  };

  return (
    <form className="form" onClick={handleSubmit}>
      <Input
        ref={inputAmountRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount</p>}
    </form>
  );
}

export default MealItemForm;
