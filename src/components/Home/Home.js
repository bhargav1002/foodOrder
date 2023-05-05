import React, { useState } from 'react';
import Meals from '../Meals/Meals';
import Cart from '../Cart/Cart';
import CartProvider from '../../store/CartProvider';
import Homenavbar1 from '../Homenavbar/Homenavbar1';

export default function Home(props) {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

    const logout = () => {
        props.setIsLoggedIn(false);
    }

  return (
      <CartProvider>
          {cartIsShown && <Cart onClose={hideCartHandler} />}
          <Homenavbar1 onShowCart={showCartHandler} log={logout} />
          <main>
              <Meals />
          </main>
      </CartProvider>
  )
}
