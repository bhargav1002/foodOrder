import React, { useEffect, useState } from 'react';
import Products from './Products';

export default function Subcategory(props) {

    const [subcategoriesdata, setSubcategoriesdata] = useState([]);

    useEffect(() => {
        setSubcategoriesdata([]);
        for (let obj in props.data) {
            setSubcategoriesdata((prev) => [...prev, { category: obj, data: props.data[obj] }]);
        }
    }, [props.data])
    return (
        <div >
            {subcategoriesdata.map((obj) => {
                return (
                    
                    <div key={obj.category} id={obj.category} className='scroll-mt-28 mt-12'>
                        <p className='text-white mt-5 text-start text-xl font-bold uppercase ms-6 underline underline-offset-4'>{obj.category}</p>
                        <Products data={obj.data}></Products>
                    </div>
                )
            })}
        </div>
    )
}
