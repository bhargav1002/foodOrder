import React from 'react';
import useInput from '../../hooks/useInput';
import classes from './AddCategory.module.css';

export default function AddCategory() {

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
        value: enteredCategory,
        isValid: enteredCategoryIsValid,
        hasError: categoryInputHasError,
        valueChangeHandler: categoryChangedHandler,
        inputBlurHandler: categoryBlurHandler,
        reset: resetCategory
    } = useInput((value) => value.trim() !== '');

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
        enteredCategoryIsValid&&
        enteredSubCategoryIsValid&&
        enteredNameIsValid &&
        enteredImgIsValid &&
        enteredDescriptionIsValid &&
        enteredPriceIsValid;

    const confirmHandler = (event) => {
        event.preventDefault();

        if (!formIsValid) {
            return;
        }

        const meal = {
            name: enteredName,
            img: enteredImg,
            description: enteredDescription,
            price: Number(enteredPrice),
        };

        addMealHandler(meal, enteredCategory, enteredSubCategory);

        resetCategory();
        resetSubCategory();
        resetName();
        resetimg();
        resetDescription();
        resetPrice();
    };

    const categoryControlClasses = `${classes.control} ${categoryInputHasError ? classes.invalid : ''
        }`;
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

  return (
      <div style={{ margin: 'auto', maxWidth: '450px' }}>
          <div className='shadow p-4 rounded-xl bg-white'>
              <h2>Add Category</h2>
              <form className={classes.form} onSubmit={confirmHandler}>
                  <div className={categoryControlClasses}>
                      <label htmlFor='category'>Category</label>
                      <input type='text' id='category' value={enteredCategory} onChange={categoryChangedHandler}
                          onBlur={categoryBlurHandler} />
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
