import React, { useEffect, useState } from 'react';
import Home from '../Home/Home';
import Login from '../Login/Login';


export default function Base() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  },[])

  return (
    <div>
      {!isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn}></Login>}
      {isLoggedIn && <Home setIsLoggedIn={setIsLoggedIn} />}
    </div>
  )
}
