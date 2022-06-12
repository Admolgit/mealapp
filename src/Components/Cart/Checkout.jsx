import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

// Helper Function for checking for empty
const isEmpty = (value) => value.trim() === '';
const is5Char = (value) => value.length >= 5;

const Checkout = (props) => {

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    address: true,
    city: true,
    postalCode: true
  });
  
  // Making reference to input values
  const nameInputRef = useRef();
  const addressRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    // Getting inputted values
    const inputedName = nameInputRef.current.value;
    const inputedAddress = addressRef.current.value;
    const inputedPostalCode = postalCodeRef.current.value;
    const inputedCity = cityRef.current.value;

    // Validating entered values
    const enteredNameIsValid = !isEmpty(inputedName);
    const enteredAddressIsValid = !isEmpty(inputedAddress);
    const enteredPostalCodeIsValid = is5Char(inputedPostalCode);
    const enteredCityIsValid = !isEmpty(inputedCity);

    // Set valid form to state
    setFormInputValidity({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid
    })

    const formIsValid = enteredNameIsValid && enteredAddressIsValid && enteredPostalCodeIsValid && enteredCityIsValid;

    if(!formIsValid) {
      return;
    }

    props.onConfirm({
      name: inputedName,
      address: inputedAddress,
      city: inputedCity,
      postalCode: inputedPostalCode
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${ formInputValidity.name ? '' : classes.notValid}`}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={`${classes.control} ${ formInputValidity.address ? '' : classes.notValid}`}>
        <label htmlFor='street'>Address</label>
        <input type='text' id='street' ref={addressRef} />
        {!formInputValidity.address && <p>Please enter a valid address.</p>}
      </div>
      <div className={`${classes.control} ${ formInputValidity.postalCode ? '' : classes.notValid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeRef} />
        {!formInputValidity.postalCode && <p>Please enter a valid postal code.</p>}
      </div>
      <div className={`${classes.control} ${ formInputValidity.city ? '' : classes.notValid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef} />
        {!formInputValidity.city && <p>Please enter a valid city.</p>}

      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;