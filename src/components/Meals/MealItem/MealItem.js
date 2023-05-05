import { useContext } from 'react';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `₹ ${props.price.toFixed(2)}`;

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  };

  return (
    <div className='flex flex-col bg-white p-2 rounded rounded-lg'>
      <img src={props.img} alt="" className='h-48 w-auto rounded rounded-lg' />
      <div>
        <h3 className='text-2xl font-bold'>{props.name}</h3>
        <div className='w-auto italic truncate'>{props.description}</div>
      </div>
      <div className='mt-auto'>
        <div className='flex justify-between mt-1'>
          <div className='mt-1 font-bold text-orange-800 text-xl'>{price}</div>
          <MealItemForm onAddToCart={addToCartHandler} />
        </div>
      </div>
    </div>
  );
};

export default MealItem;
