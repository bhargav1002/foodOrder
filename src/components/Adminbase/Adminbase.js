import React, { useState } from 'react';
import Admin from '../admin/Admin';
import Adminlogin from '../Adminlogin/Adminlogin';

export default function Adminbase() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
      <div>
          {!isLoggedIn && <Adminlogin setIsLoggedIn={setIsLoggedIn}></Adminlogin>}
          {isLoggedIn && <Admin setIsLoggedIn={setIsLoggedIn} />}
      </div>
  )
}
