import React, { useState, useEffect } from 'react';
import MealItem from './MealItem/MealItem';

export default function Products(props) {

    const [subsubcategoriesdata, setSubsubcategoriesdata] = useState([]);

    useEffect(() => {
        setSubsubcategoriesdata([]);
        for (let obj in props.data) {
            setSubsubcategoriesdata((prev) => [...prev, { category: obj, data: props.data[obj] }]);
        }
    }, [props.data])

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-10 gap-4 m-6'>
            {subsubcategoriesdata.map((obj) => {
                return (
                    <MealItem key={obj.data.name} id={obj.data.name} name={obj.data.name} description={obj.data.description} price={obj.data.price} img={obj.data.img}></MealItem>
                )
            })}
        </div>
    )
}
