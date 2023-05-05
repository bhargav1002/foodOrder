import React, { useState, useEffect } from 'react'
import classes from './Adminlogin.module.css';
import cl from '../Layout/Header.module.css';
import useInput from '../../hooks/useInput';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';
import { Link } from 'react-router-dom';
import img2 from '../../assets/meals.jpg'

export default function Adminlogin(props) {

    const [formisValid, setFormisValid] = useState(true);

    const {
        value: adminsigninenteredemail,
        isValid: adminsigninemailIsValid,
        hasError: adminsigninemailInputHasError,
        valueChangeHandler: adminsigninemailChangedHandler,
        inputBlurHandler: adminsigninemailBlurHandler
    } = useInput((value) => value.trim() !== '' && value.includes('@'));

    const {
        value: adminsigninenteredpass,
        isValid: adminsigninpassIsValid,
        hasError: adminsigninpassInputHasError,
        valueChangeHandler: adminsigninpassChangedHandler,
        inputBlurHandler: adminsigninpassBlurHandler
    } = useInput((value) => value.trim() !== '' && value.length > 6);

    const checkuser = (data) => {
        for (let obj in data) {
            if(data[obj].email === adminsigninenteredemail && data[obj].Password === adminsigninenteredpass) 
            {
                props.setIsLoggedIn(true);
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
        await fetch('https://react-6784b-default-rtdb.firebaseio.com/adminusers.json', {
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

    const adminsigninemailControlClasses = `${classes.control} ${adminsigninemailInputHasError ? classes.invalid : ''
        }`;
    const adminsigninpassControlClasses = `${classes.control} ${adminsigninpassInputHasError ? classes.invalid : ''
        }`;

    const formIsValid =
        adminsigninemailIsValid &&
        adminsigninpassIsValid;

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
                        <h2 style={{ textAlign: "center" }}>Admin Login</h2>
                    </div>
                    <form className={classes.form} onSubmit={confirmHandler}>
                        <div className={adminsigninemailControlClasses}>
                            <label htmlFor='name'>Email</label>
                            <input type='email' id='name' value={adminsigninenteredemail} onChange={adminsigninemailChangedHandler}
                                onBlur={adminsigninemailBlurHandler} style={{ width: "100%", height: "40px" }} />

                        </div>
                        <br></br>
                        <div className={adminsigninpassControlClasses}>
                            <label htmlFor='street'>Password</label>
                            <input type='password' id='street' value={adminsigninenteredpass} onChange={adminsigninpassChangedHandler}
                                onBlur={adminsigninpassBlurHandler} style={{ width: "100%", height: "40px" }} />
                        </div>
                        <br></br>
                        <div className={classes.actions}>
                            <button className={classes.submit}>Login</button>
                        </div>
                    </form>
                    <div style={{ textAlign: "center" }}>
                        <p><span className='text-blue-600'><Link to="/">User Login</Link></span></p>
                    </div>
                </div>
            </section>
        </div>
    )
}
