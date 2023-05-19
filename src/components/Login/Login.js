import React, { useState, useEffect } from 'react'
import classes from './Login.module.css';
import cl from '../Layout/Header.module.css';
import useInput from '../../hooks/useInput';
import { Link } from 'react-router-dom';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';
import img2 from '../../assets/meals.jpg'

export default function Login(props) {

    const [formisValid, setFormisValid] = useState(true);

    const {
        value: signinenteredemail,
        isValid: signinemailIsValid,
        hasError: signinemailInputHasError,
        valueChangeHandler: signinemailChangedHandler,
        inputBlurHandler: signinemailBlurHandler
    } = useInput((value) => value.trim() !== '' && value.includes('@'));

    const {
        value: signinenteredpass,
        isValid: signinpassIsValid,
        hasError: signinpassInputHasError,
        valueChangeHandler: signinpassChangedHandler,
        inputBlurHandler: signinpassBlurHandler
    } = useInput((value) => value.trim() !== '' && value.length > 6);

    const checkuser = (data) => {
        const setvalue = () => {
            props.setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", 1);
        }
        for (let obj in data) {
            if (data[obj].email === signinenteredemail && data[obj].Password === signinenteredpass) {
                setvalue();
                return;
            }
        }
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
        setTimeout(() => toastr.error(`Enter Correct Email and Password`), 300);

    }

    const usercheck = async () => {
        await fetch('https://foodorder-749de-default-rtdb.firebaseio.com/users.json', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((y) => checkuser(y))
    };

    const confirmHandler = (event) => {
        event.preventDefault();
        if (!formisValid) {
            usercheck();
        }
        else {
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
            setTimeout(() => toastr.error(`Enter Correct Email and Password`), 300);
        }
    };

    const signinemailControlClasses = `${classes.control} ${signinemailInputHasError ? classes.invalid : ''
        }`;
    const signinpassControlClasses = `${classes.control} ${signinpassInputHasError ? classes.invalid : ''
        }`;

    const formIsValid =
        signinemailIsValid &&
        signinpassIsValid;

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
                        <h2 style={{ textAlign: "center" }} className='text-2xl'>Login</h2>
                    </div>
                    <form className={classes.form} onSubmit={confirmHandler}>
                        <div className={signinemailControlClasses}>
                            <label htmlFor='name'>Email</label>
                            <input type='email' id='name' value={signinenteredemail} onChange={signinemailChangedHandler}
                                onBlur={signinemailBlurHandler} style={{ width: "100%", height: "40px" }} />

                        </div>
                        <br></br>
                        <div className={signinpassControlClasses}>
                            <label htmlFor='street'>Password</label>
                            <input type='password' id='street' value={signinenteredpass} onChange={signinpassChangedHandler}
                                onBlur={signinpassBlurHandler} style={{ width: "100%", height: "40px" }} />
                        </div>
                        <br></br>
                        <div className={classes.actions}>
                            <button className={classes.submit}>Login</button>
                        </div>
                    </form>
                    <div style={{ textAlign: "center" }}>
                        <p>Don't have an Account? <span className='text-blue-600'><Link to="/SignUp">SignUp</Link></span></p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <p><span className='text-blue-600'><Link to="/Admin">Admin Login</Link></span></p>
                    </div>
                </div>
            </section>
        </div>
    )
}
