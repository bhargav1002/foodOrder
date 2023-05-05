import React,{useState,useEffect} from 'react';
import useInput from '../../hooks/useInput';
import classes from './AddSubCategory.module.css';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css';

const AddSubCategory = () => {
    async function addMealHandler(meal, category, subcategory) {
        const response = await fetch(`https://foodorder-749de-default-rtdb.firebaseio.com/Categories/${category}/${subcategory}.json`, {
            method: 'POST',
            body: JSON.stringify(meal),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
    }

    
    const {
        value: enteredSubCategory,
        isValid: enteredSubCategoryIsValid,
        hasError: subCategoryInputHasError,
        valueChangeHandler: subCategoryChangedHandler,
        inputBlurHandler: subCategoryBlurHandler,
        reset: resetSubCategory
    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetName
    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredImg,
        isValid: enteredImgIsValid,
        hasError: imgInputHasError,
        valueChangeHandler: imgChangedHandler,
        inputBlurHandler: imgBlurHandler,
        reset: resetimg
    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredDescription,
        isValid: enteredDescriptionIsValid,
        hasError: descriptionInputHasError,
        valueChangeHandler: descriptionChangedHandler,
        inputBlurHandler: descriptionBlurHandler,
        reset: resetDescription
    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredPrice,
        isValid: enteredPriceIsValid,
        hasError: priceInputHasError,
        valueChangeHandler: priceChangedHandler,
        inputBlurHandler: priceBlurHandler,
        reset: resetPrice
    } = useInput((value) => value.trim() !== '');

    const formIsValid =
        enteredSubCategoryIsValid &&
        enteredNameIsValid &&
        enteredImgIsValid &&
        enteredDescriptionIsValid &&
        enteredPriceIsValid;

    const confirmHandler = (event) => {
        event.preventDefault();

        if (!formIsValid || event.target.elements.Category.value === '') {
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
            setTimeout(() => toastr.warning(`Please select Category`), 300);
            return;
        }

        const meal = {
            name: enteredName,
            img: enteredImg,
            description: enteredDescription,
            price: Number(enteredPrice),
        };

        addMealHandler(meal, selectedcategory , enteredSubCategory);

        event.target.elements.Category.value = ''
        resetSubCategory();
        resetName();
        resetimg();
        resetDescription();
        resetPrice();
    };

    const subCategoryControlClasses = `${classes.control} ${subCategoryInputHasError ? classes.invalid : ''
        }`;
    const nameControlClasses = `${classes.control} ${nameInputHasError ? classes.invalid : ''
        }`;
    const imgControlClasses = `${classes.control} ${imgInputHasError ? classes.invalid : ''
        }`;
    const descriptionControlClasses = `${classes.control} ${descriptionInputHasError ? classes.invalid : ''
        }`;
    const priceControlClasses = `${classes.control} ${priceInputHasError ? classes.invalid : ''
        }`;

    const [data, setData] = useState(null);
    const [categoriesdata, setCategoriesdata] = useState([]);
    const [selectedcategory, setSelectedcategory] = useState('');

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

    const categoryHandler = (e) => {
        setSelectedcategory(e.target.value);
    }

    const category = categoriesdata.length ? (
        categoriesdata.map(obj => {
            return (<option value={obj.category} key={obj.category}>{obj.category}</option>)
        })
    ) : (<option value='no data'>no data</option>)

    return (
        <div style={{ margin: 'auto', maxWidth: '450px' }}>
            <div className='shadow p-4 rounded-xl bg-white'>
                <h2>Add Sub Category</h2>
                <form className={classes.form} onSubmit={confirmHandler}>
                    <div className={classes.control}>
                        <label htmlFor="Category">Category</label>
                        <select name="Category" id="Category" onChange={categoryHandler} >
                            <option value="">select</option>
                            {category}
                        </select>
                    </div>
                    <div className={subCategoryControlClasses}>
                        <label htmlFor='subCategory'>Sub Category</label>
                        <input type='text' id='subCategory' value={enteredSubCategory} onChange={subCategoryChangedHandler}
                            onBlur={subCategoryBlurHandler} />
                    </div>
                    <div className={nameControlClasses}>
                        <label htmlFor='name'>Name</label>
                        <input type='text' id='name' value={enteredName} onChange={nameChangedHandler}
                            onBlur={nameBlurHandler} />
                    </div>
                    <div className={imgControlClasses}>
                        <label htmlFor='img'>Img URL</label>
                        <input type='text' id='img' value={enteredImg} onChange={imgChangedHandler}
                            onBlur={imgBlurHandler} />
                    </div>
                    <div className={descriptionControlClasses}>
                        <label htmlFor='description'>Description</label>
                        <textarea rows='3' id='description' value={enteredDescription} onChange={descriptionChangedHandler}
                            onBlur={descriptionBlurHandler}></textarea>
                    </div>
                    <div className={priceControlClasses}>
                        <label htmlFor='price'>Price</label>
                        <input type='text' id='price' value={enteredPrice} onChange={priceChangedHandler}
                            onBlur={priceBlurHandler} />
                    </div>
                    <div className={classes.actions}>
                        {formIsValid && <button className={classes.submit}>Confirm</button>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddSubCategory;
