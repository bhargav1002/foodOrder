import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = (props) => {

  const logoutHandler = () => {
    props.log();
    localStorage.setItem("isLoggedIn", 0);
  }

  return (
    <Fragment>
      <header className={classes.header}>
        <h2 className='font-bold text-3xl'>FoodOrder</h2>
        <div style={{ display: "flex" }}>
          <HeaderCartButton onClick={props.onShowCart} />
          <button className={classes.bt} onClick={logoutHandler}><i className="fa-solid fa-right-from-bracket fa-2xl"></i></button>
        </div>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;
