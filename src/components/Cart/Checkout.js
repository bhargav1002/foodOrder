import useInput from '../../hooks/useInput';
import classes from './Checkout.module.css';

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangedHandler,
    inputBlurHandler: streetBlurHandler
  } = useInput((value) => value.trim() !== '');

  const {
    value: enteredPinCode,
    isValid: enteredPinCodeIsValid,
    hasError: pinCodeInputHasError,
    valueChangeHandler: pinCodeChangedHandler,
    inputBlurHandler: pinCodeBlurHandler
  } = useInput((value) => value.trim() !== '' && value.trim().length === 6);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler
  } = useInput((value) => value.trim() !== '');

  const formIsValid =
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredCityIsValid &&
    enteredPinCodeIsValid;

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      pinCode: enteredPinCode,
    });
  };

  const nameControlClasses = `${classes.control} ${nameInputHasError ? classes.invalid : ''
    }`;
  const streetControlClasses = `${classes.control} ${streetInputHasError ? classes.invalid : ''
    }`;
  const pinCodeControlClasses = `${classes.control} ${pinCodeInputHasError ? classes.invalid : ''
    }`;
  const cityControlClasses = `${classes.control} ${cityInputHasError ? classes.invalid : ''
    }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={enteredName} onChange={nameChangedHandler}
          onBlur={nameBlurHandler} />
        {nameInputHasError && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street and Area</label>
        <input type='text' id='street' value={enteredStreet} onChange={streetChangedHandler}
          onBlur={streetBlurHandler} />
        {streetInputHasError && <p>Please enter a valid street and area!</p>}
      </div>
      <div className={pinCodeControlClasses}>
        <label htmlFor='postal'>Pin Code</label>
        <input type='text' id='postal' value={enteredPinCode} onChange={pinCodeChangedHandler}
          onBlur={pinCodeBlurHandler} />
        {pinCodeInputHasError && (
          <p>Please enter a valid Pin code (6 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' value={enteredCity} onChange={cityChangedHandler}
          onBlur={cityBlurHandler} />
        {cityInputHasError && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        {formIsValid && <button className={classes.submit}>Confirm</button>}
      </div>
    </form>
  );
};

export default Checkout;
