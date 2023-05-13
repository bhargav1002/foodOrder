import React, { useEffect, useState } from 'react';
import classes from './Signup.module.css';
import cl from '../Layout/Header.module.css';
import useInput from '../../hooks/useInput';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';
import { Link } from 'react-router-dom';
import img2 from '../../assets/meals.jpg';

export default function Signup() {

    const [formisValid, setFormisValid] = useState(true);
    const [statusCode, setStatusCode] = useState(0);
    const [inputClear, setInputClear] = useState(true);

    const {
        value: enteredemail,
        isValid: emailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler
    } = useInput((value) => value.trim() !== '' && value.includes('@'));

    const {
        value: enteredpass,
        isValid: passIsValid,
        hasError: passInputHasError,
        valueChangeHandler: passChangedHandler,
        inputBlurHandler: passBlurHandler
    } = useInput((value) => value.trim() !== '' && value.length > 6);

    const userRegistration = async () => {
        await fetch('https://foodorder-749de-default-rtdb.firebaseio.com/users.json', {
            method: 'POST',
            body: JSON.stringify({
                email: enteredemail,
                Password: enteredpass
            }),
        })
            .then((response) => setStatusCode(response.status))
    };

    useEffect(() => {
        if (statusCode === 200) {
            toastr.options = {
                "closeButton": true,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-bottom-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            toastr.clear();
            setTimeout(() => toastr.success(`Registration Done Successfully`), 300);
        }
    }, [statusCode]);

    const confirmHandler = (event) => {
        event.preventDefault();
        if (!formisValid) {
            userRegistration();
            setInputClear(false);
            setFormisValid(true);
        }
    };

    const emailControlClasses = `${classes.control} ${emailInputHasError ? classes.invalid : ''
        }`;
    const passControlClasses = `${classes.control} ${passInputHasError ? classes.invalid : ''
        }`;

    const formIsValid =
        emailIsValid &&
        passIsValid;

    useEffect(() => {
        formIsValid && setFormisValid(false);
    }, [formIsValid]);

    const myStyle = {
        backgroundImage:
            `url(${img2})`,
        backgroundSize: 'cover',
    };

    return (
        <div style={myStyle}>
            <header className={cl.header}>
                <h2 className='font-bold text-3xl'>FoodOrder</h2>
            </header>
            <section style={{ maxWidth: '30rem', margin: 'auto' }} className='h-screen pt-48'>
                <div className='shadow p-4 rounded-xl bg-white' style={{ zIndex: 100 }}>
                    <div>
                        <h2 style={{ textAlign: "center" }}>SignUp</h2>
                    </div>
                    <form className={classes.form} onSubmit={confirmHandler}>
                        <div className={emailControlClasses}>
                            <label htmlFor='name'>Email</label>
                            <input type='email' id='name' value={inputClear ? enteredemail : ''} onChange={emailChangedHandler}
                                onBlur={emailBlurHandler} style={{ width: "100%", height: "40px" }} />
                        </div>
                        <br></br>
                        <div className={passControlClasses}>
                            <label htmlFor='street'>Password</label>
                            <input type='password' id='street' value={inputClear ? enteredpass : ''} onChange={passChangedHandler}
                                onBlur={passBlurHandler} style={{ width: "100%", height: "40px" }} />
                        </div>
                        <br></br>
                        <div className={classes.actions}>
                            <button className={classes.submit} disabled={formisValid}>Submit</button>
                        </div>
                    </form>
                    <div style={{ textAlign: "center" }}>
                        <p>Already have an Account? <span className='text-blue-600'><Link to="/">Login</Link></span></p>
                    </div>
                </div>
            </section>
        </div>
    )
}
