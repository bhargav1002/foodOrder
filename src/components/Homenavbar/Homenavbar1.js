import React, { useState, useEffect } from "react";
import HeaderCartButton from "../Layout/HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Homenavbar.module.css";
import Navbarsubcategory from "./Navbarsubcategory";

export default function Homenavbar(props) {
    const logoutHandler = () => {
        props.log();
        localStorage.setItem("isLoggedIn", 0);
    };

    const [data, setData] = useState(null);
    const [categoriesdata, setCategoriesdata] = useState([]);
    const [subcategoriesdata, setSubcategoriesdata] = useState([]);
    const [sidebarclicked, setSidebarclicked] = useState(false);

    useEffect(() => {
        setCategoriesdata([]);
        setSubcategoriesdata([]);
        for (let obj in data) {
            setCategoriesdata((prev) => [...prev, obj]);
            setSubcategoriesdata((z) => [...z, data[obj]]);
        }
    }, [data]);

    useEffect(() => {
        setData(null);
        fetch(
            "https://foodorder-749de-default-rtdb.firebaseio.com/Categories.json",
            { method: "GET" }
        )
            .then((response) => response.json())
            .then((y) => setData(y));
    }, []);

    const setdropdownHandler = (e) => {
        let box = document.getElementById("down-" + e.target.value)
        if (box.classList.contains("hidden")) {
            box.classList.remove("hidden");
        }
        else {
            box.classList.add("hidden");

        }
    }

    const setsidedropdownHandler = (e) => {
        let box = document.getElementById("sidedown-" + e.target.value)
        if (box.classList.contains("hidden")) {
            box.classList.remove("hidden");
        }
        else {
            box.classList.add("hidden");

        }
    }

    const sidebarHandler = (e) => {
        setSidebarclicked(true);
        let box = document.getElementById("hamburger")
        if (box.classList.contains("hidden")) {
            box.classList.remove("hidden");
        }
        else {
            box.classList.add("hidden");
        }
        window.scrollTo({top:0,behavior:'smooth'})
    }

    const sidebarcloseHandler = (e) => {
        setSidebarclicked(false);
        let box = document.getElementById("hamburger")
        if (box.classList.contains("hidden")) {
            box.classList.remove("hidden");
        }
        else {
            box.classList.add("hidden");
        }
    }

    return (
        <div>
            <header >
                <div className={classes.header}>
                    <div className="flex">
                        <div><i className="fa-solid fa-bars fa-2xl mt-6 2xl:hidden -ml-6" style={{ color: "#ffffff"}} onClick={sidebarHandler} id="hamburger"></i></div>
                        <h2 className="font-bold text-3xl mt-1 mr-10 ml-1">FoodOrder</h2>
                        <div className="relative group hidden 2xl:flex">
                            {categoriesdata.map((obj, i) => {
                                return (
                                        <div className="px-4 mt-1" id={`drop-${i}`} key={i}>
                                            <div className="group inline-block relative">
                                                <button
                                                    className="font-semibold py-2 px-1 rounded inline-flex items-center"
                                                    onClick={setdropdownHandler} value={i} style={{ backgroundColor: '#8a2b06' }}>
                                                    {obj}

                                                </button>
                                                <ul className="absolute hidden text-gray-700 w-auto" value={i} id={`down-${i}`}>
                                                    <Navbarsubcategory data={subcategoriesdata[i]} sidebarcloseHandler={sidebarcloseHandler}></Navbarsubcategory>
                                                </ul>
                                            </div>
                                        </div>
                                );
                            })}

                        </div>
                    </div>

                    <div style={{ display: "flex" }} className="-ml-6">
                        <HeaderCartButton onClick={props.onShowCart} />
                        <button className={classes.bt} onClick={logoutHandler}>
                            <i className="fa-solid fa-right-from-bracket fa-2xl"></i>
                        </button>
                    </div>
                </div>
                <div className="bg-white h-auto pb-5 w-auto mt-20 pt-5" style={{ display: sidebarclicked ? 'flex' : 'none' }}>
                    <div className="container flex flex-row-reverse justify-between mx-auto">
                        <div><i className="fa-solid fa-xmark fa-2xl pr-5" style={{ color: "#a61f07" }} onClick={sidebarcloseHandler}></i></div>
                        <div>{categoriesdata.map((obj, i) => {
                            return (
                                    <div className="px-4 mt-1" id={`drop-${i}`} key={i}>
                                        <div className="group inline-block relative">
                                            <button
                                                className="font-semibold py-2 px-1 rounded inline-flex justify-start w-72 bg-slate-300 text-black hover:bg-slate-300"
                                                onClick={setsidedropdownHandler} value={i}>
                                                {obj}

                                            </button>
                                            <ul className="relative hidden text-gray-700 w-72" value={i} id={`sidedown-${i}`}>
                                                <Navbarsubcategory data={subcategoriesdata[i]} sidebarcloseHandler={sidebarcloseHandler}></Navbarsubcategory>
                                            </ul>
                                        </div>
                                    </div>
                            );
                        })}</div>
                    </div>
                </div>
            </header>
            <div className={classes["main-image"]}>
                <img src={mealsImage} alt="A table full of delicious food!" />
            </div>
        </div>
    );
}
