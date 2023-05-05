import React, { useState, useEffect } from 'react';
import classes from './updateMeal.module.css';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';

export default function UpdateMeal() {

  const [data, setData] = useState(null);
  const [categoriesdata, setCategoriesdata] = useState([]);
  const [selectedcategory, setSelectedcategory] = useState('');
  const [selectedsubcategory, setSelectedsubcategory] = useState('');
  const [filteredsubcategory, setFilteredsubcategory] = useState([]);
  const [subcategorydata, setSubcategoryData] = useState([]);
  const [productsdata, setProductsdata] = useState([]);
  const [productskey, setProductskey] = useState([]);
  const [selectedproduct, setSelectedproduct] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  let formIsValid =
    name!=='' &&
    url!=='' &&
    description!=='' &&
    price !=='';

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid || event.target.elements.Category.value === '' || event.target.elements.SubCategory.value === '' || event.target.elements.products.value === '') {
      toastr.options = {
        "closeButton": true,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }
      toastr.clear();
      setTimeout(() => toastr.warning(`Please fill all the fields`), 300);
      return;
    }
    let info = {
      "name":name,
      "img":url,
      "price":price,
      "description":description
    }
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(info);

    let requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`https://foodorder-749de-default-rtdb.firebaseio.com/Categories/${selectedcategory}/${selectedsubcategory}/${selectedproduct}.json`, requestOptions)
      .then(response => response.text())
      .catch(error => console.log('error', error));

    event.target.elements.Category.value = '' ; 
    event.target.elements.SubCategory.value = '' ; 
    event.target.elements.products.value = '' ;
    setName('');
    setPrice('');
    setUrl('');
    setDescription('');
  };

  useEffect(() => {
    setCategoriesdata([]);
    for (let obj in data) {
      setCategoriesdata((prev) => [...prev, { category: obj, data: data[obj] }]);
    }
  }, [data]);

  useEffect(() => {
    filteredsubcategory.map(obj => {
      return (setSubcategoryData(Object.keys(obj.data)))
    })
  }, [filteredsubcategory])

  useEffect(() =>
  {
    setProductskey([]);
    setProductsdata([]);
    for (let obj in filteredsubcategory)
    {
      for (let d in filteredsubcategory[obj].data[selectedsubcategory])
      {
        setProductskey((prev) => [...prev,d]);
        setProductsdata((prev) => [...prev,filteredsubcategory[obj].data[selectedsubcategory][d]]);
      }
    }
  }, [selectedsubcategory, filteredsubcategory]);

  useEffect(() => {
    setFilteredsubcategory(categoriesdata.filter((obj) =>
      obj.category === selectedcategory
    ))
  }, [categoriesdata, selectedcategory])

  useEffect(() => {
    setData(null);
    fetch(
      "https://foodorder-749de-default-rtdb.firebaseio.com/Categories.json",
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((y) => setData(y));
  }, []);

  const categoryHandler = (e) => {
    setSelectedcategory(e.target.value);
  }
  const subcategoryHandler = (e) => {
    setSelectedsubcategory(e.target.value);
  }

  const productsHandler = (e) =>
  {
    setSelectedproduct(e.target.value);
    setName(filteredsubcategory[0].data[selectedsubcategory][e.target.value].name);
    setPrice(filteredsubcategory[0].data[selectedsubcategory][e.target.value].price);
    setDescription(filteredsubcategory[0].data[selectedsubcategory][e.target.value].description);
    setUrl(filteredsubcategory[0].data[selectedsubcategory][e.target.value].img);

  }

  const category = categoriesdata.length ? (
    categoriesdata.map(obj => {
      return (<option value={obj.category} key={obj.category}>{obj.category}</option>)
    })
  ) : (<option value='no data'>no data</option>)

  const Subcategory = subcategorydata.length ? (
    subcategorydata.map(obj => {
      return (<option value={obj} key={obj}>{obj}</option>)
    })
  ) : (<option value='no data'>no data</option>)

  const products = subcategorydata.length ? (
    productsdata.map((obj,i) => {
      return (<option value={productskey[i]} key={obj.name}>{obj.name}</option>)
    })
  ) : (<option value='no data'>no data</option>)

  return (
    <div style={{ margin: 'auto', maxWidth: '550px'}}>
      <div className='shadow p-4 rounded-xl bg-white'>
        <h2>Update Meal</h2>
        <form className={classes.form} onSubmit={confirmHandler} style={{ height: "500px" }}>
          <div className='flex gap-5 pb-4'>
            <div className={classes.control}>
              <label htmlFor="Category">Category</label>
              <select name="Category" id="Category" onChange={categoryHandler} >
                <option value="">select</option>
                {category}
              </select>
            </div>
            <div className={classes.control}>
              <label htmlFor="SubCategory">Sub Category</label>
              <select name="SubCategory" id="SubCategory" onChange={subcategoryHandler} >
                <option value="">select</option>
                {Subcategory}
              </select>
            </div>
            <div className={classes.control}>
              <label htmlFor="products">Products</label>
              <select name="products" id="products" onChange={productsHandler} >
                <option value="">select</option>
                {products}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor='name' className='font-bold'>Name</label>
            <br></br>
            <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} className='border border-2 rounded' style={{width:"500px"}}/>
          </div>
          <br></br>
          <div>
            <label htmlFor='img' className='font-bold'>Img URL</label><br></br>
            <input type='text' id='img' value={url} onChange={(e) => setUrl(e.target.value)} className='border border-2 rounded' style={{ width: "500px" }} />
          </div>
          <br></br>
          <div>
            <label htmlFor='description' className='font-bold'>Description</label><br></br>
            <textarea rows='3' id='description' value={description} onChange={(e) => setDescription(e.target.value)} className='border border-2 rounded' style={{ width: "500px" }}></textarea>
          </div>
          <br></br>
          <div>
            <label htmlFor='price' className='font-bold'>Price</label><br></br>
            <input type='text' id='price' value={price} onChange={(e) => setPrice(e.target.value)} className='border border-2 rounded' style={{ width: "500px" }} />
          </div>
          <br></br>
          <div className='flex justify-end me-4'>
            {formIsValid && <button className={classes.submit}>Confirm</button>}
          </div>
        </form>
      </div>
    </div>
  )
}
