import React, { useEffect, useState } from 'react';

export default function Navbarsubcategory(props) {

    const [subcategories, setSubcategories] = useState([]);

    useEffect(()=>
    {
        setSubcategories([]);
        for(let obj in props.data)
        {
            setSubcategories((prev)=> [...prev,obj]);
        }
    },[props.data]);

    const closeHandler = () =>
    {
        props.sidebarcloseHandler();
    }

  return (
    <div>
        {subcategories.map((obj,i)=>
        {
            return(
                    <li key={i}>
                        <a
                            className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                            href={`#${obj}`} onClick={closeHandler}>{obj}</a>
                    </li> 
            )
        })}
    </div>
  )
}
