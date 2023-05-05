import React, { useState, useEffect } from 'react';
import Subcategory from './Subcategory';
export default function AvailableMeals() {

  const [data, setData] = useState(null);
  const [categoriesdata, setCategoriesdata] = useState([]);

  useEffect(() => {
    setCategoriesdata([]);
    for (let obj in data) {
      setCategoriesdata((prev) => [...prev, { category: obj, data: data[obj] }]);
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

  return (
    <div className='-mt-24'>
      {categoriesdata.map((obj) => {
        return (
          <div key={obj.category}>
            <section id={obj.category} className='container mx-auto'>
              <p className='text-center text-5xl font-bold uppercase ms-6 mt-32' style={{ color: '#b94517' }}>{obj.category}</p>
              <div className='border border-2 mx-4'></div>
              <Subcategory data={obj.data}></Subcategory>
            </section>
          </div>
        )
      })}
    </div>
  )
}

