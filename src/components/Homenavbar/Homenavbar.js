import React, { useState, useEffect } from "react";
import HeaderCartButton from "../Layout/HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Homenavbar.module.css";

export default function Homenavbar(props) {
  const logoutHandler = () => {
    props.log();
    localStorage.setItem("isLoggedIn", 0);
  };

  const [data, setData] = useState(null);
  const [categoriesdata, setCategoriesdata] = useState([]);
  const [subcategoriesdata, setSubcategoriesdata] = useState([]);
  console.log(subcategoriesdata)
  useEffect(() => {
    setCategoriesdata([]);
    setSubcategoriesdata([]);
    for (let obj in data) {
      setCategoriesdata((prev) => [...prev, obj]);
      fetch(
        `https://foodorder-749de-default-rtdb.firebaseio.com/Categories/${obj}.json`,
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((y) => setSubcategoriesdata((z) => [...z, y]));
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

  // console.log(subcategoriesdata)
  return (
    <div>
      <header className={classes.header}>
        <div className="flex">
          <h2 className="font-bold text-3xl mt-2">FoodOrder</h2>
          <div className="relative group hidden 2xl:flex">
            {categoriesdata.map((obj) => {
              return (
                <button key={obj} className="flex flex-row items-center w-full px-1  py-4 mt-2 font-bold text-left uppercase bg-transparent rounded-lg md:w-auto md:inline md:mt-0 md:ml-4 focus:outline-none font-montserrat">
                  <span >{obj}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <HeaderCartButton onClick={props.onShowCart} />
          <button className={classes.bt} onClick={logoutHandler}>
            <i className="fa-solid fa-right-from-bracket fa-2xl"></i>
          </button>
        </div>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </div>
  );
}
