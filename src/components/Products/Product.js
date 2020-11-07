import React from 'react';
import { Link } from 'react-router-dom';
import StarIcon from '../icons/StarIcon';
import Button from '../Button';
import CartIcon from '../icons/CartIcon';
import { generatePublicPath } from '../../utils/generatePublicPath';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import { AiFillHeart } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function Product({
  id,
  name,
  price,
  rating = 0,
  image,
  direction,
  onDelete,
  onUpdate,
  favorited,
  onWishlist,
}) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const onAddToCartHandler = (productId) => {
    dispatch(addToCart(productId));
  };

  let card;
  if (direction === 'vertical') {
    card = (
      <div className='rounded-mammoth overflow-hidden bg-white shadow-lg flex flex-col justify-between'>
        <div className='h-48 max-w-sm relative'>
          <img
            className='w-full h-full rounded-mammoth'
            src={generatePublicPath(image)}
            alt={name}
          />

          <IconContext.Provider
            value={{
              className: `absolute top-0 right-0 mt-2 mr-2 bg-red-500 ${
                !favorited ? 'text-white hover:text-red-hell' : 'text-red-hell hover:text-white'
              } transition duration-300 ease-in-out rounded-lg p-1 `,
              size: '2rem',
            }}
          >
            <button onClick={() => onWishlist(id)}>
              <AiFillHeart />
            </button>
          </IconContext.Provider>
        </div>
        <div className='flex justify-between items-center px-4'>
          <div className='pb-4'>
            <Link to={`/product/${id}`}>
              <h4 className='text-gray-900 pt-4 font-bold hover:text-gray-600 transition duration-300 ease-in-out'>
                {name.toUpperCase()}
              </h4>
            </Link>
            <div className='rating flex mr-2 mt-2 -ml-1'>
              {Array(5)
                .fill()
                .map((_, index) => {
                  return <StarIcon key={index} size='big' background='text-red-hell' />;
                })}
            </div>
            <h4 className='text-gray-600 mt-3 font-semibold'>${price}</h4>
          </div>

          <button onClick={() => onAddToCartHandler(id)}>
            {
              <CartIcon
                size='big'
                variant='p-2 rounded-lg bg-blue-sea hover:bg-white border-2 border-blue-sea hover:text-blue-sea transition duration-500 ease-in-out'
              />
            }
          </button>
        </div>
        {user?.role === 'admin' && (
          <div className='flex justify-between'>
            <button
              onClick={() => onDelete(id)}
              className='bg-red-hell text-center py-2 text-white w-full font-semibold tracking-wide hover:bg-red-800 transition duration-300 ease-in-out'
            >
              DELETE
            </button>

            <Link
              to={`/admin/edit-product/${id}`}
              className='bg-yellow-dark text-center py-2 text-black w-full font-semibold tracking-wide hover:bg-yellow-600 transition duration-300 ease-in-out'
            >
              EDIT
            </Link>
          </div>
        )}
      </div>
    );
  }

  if (direction === 'horizontal') {
    card = (
      <div className='flex'>
        <div className='w-40 h-32 rounded-mammoth overflow-hidden'>
          <img className='w-full h-full object-cover' src={image} alt={name} />
        </div>
        <div className='ml-4 md:ml-3'>
          <h4 className='pt-2 text-gray-700 text-sm '>{name}</h4>
          <div className='rating flex mr-2 mt-1 -ml-1'>
            <StarIcon size='small' background='text-red-hell' />
            <StarIcon size='small' background='text-red-hell' />
            <StarIcon size='small' background='text-red-hell' />
            <StarIcon size='small' background='text-red-hell' />
            <StarIcon size='small' background='text-red-hell' />
          </div>
          <h4 className='text-gray-600 mt-2 font-semibold text-sm'>${price}</h4>
          <div className='mt-2'>
            <Button background='bg-red-hell lg:text-tiny' size='small'>
              Add To Cart {<CartIcon size='small' />}
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return card;
}

export default Product;
