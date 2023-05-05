import React from 'react';
import classes from './Admin.module.css';
import img2 from '../../assets/meals.jpg';
import { useNavigate, Outlet } from 'react-router-dom';

export default function Admin(props) {
    const navigate = useNavigate()
    const handleOrderClick = () => {
        navigate('ShowOrder')
    }
    const handleAddMealClick = () => {
        navigate('AddMeal')
    }
    const handleUpdateMealClick = () => {
        navigate('UpdateMeal')
    }
    const handleAddCategoryClick = () => {
        navigate('AddCategory')
    }
    const handleAddSubCategoryClick = () => {
        navigate('AddSubCategory')
    }

    const myStyle = {
        backgroundImage:
            `url(${img2})`,
        backgroundSize: 'cover',
    };

    const logoutHandler = () => {
        props.setIsLoggedIn(false);
    }

    return (
        <div style={myStyle} className='h-screen overflow-auto'>
            <header className={classes.header}>
                <h2 className='font-bold text-3xl'>Admin Panel</h2>
                <div style={{display:"flex"}}>
                    <button style={{ backgroundColor: '#8a2b06', border: "none" }} onClick={logoutHandler}><i className="fa-solid fa-right-from-bracket fa-2xl"></i></button>
                </div>
            </header>
            <div className='grid grid-cols-5'>
                <div className='bg-white h-screen pt-24'>
                    <div className='text-black text-center text cursor-pointer text-xl hover:font-bold my-5' onClick={handleOrderClick}>Orders</div>
                    <div className='text-black text-center text cursor-pointer text-xl hover:font-bold my-5' onClick={handleAddCategoryClick}>Add Category</div>
                    <div className='text-black text-center text cursor-pointer text-xl hover:font-bold my-5' onClick={handleAddSubCategoryClick}>Add Sub-Category</div>
                    <div className='text-black text-center text cursor-pointer text-xl hover:font-bold my-5' onClick={handleAddMealClick}>Add meals</div>
                    <div className='text-black text-center text cursor-pointer text-xl hover:font-bold my-5' onClick={handleUpdateMealClick}>Update meals</div>
                </div>
                <div className='col-span-4 overflow-auto h-screen pt-24'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
}
