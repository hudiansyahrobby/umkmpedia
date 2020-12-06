import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import ProductImage from './ProductImage';
import ProductTitle from './ProductTitle';
import ProductStar from './ProductStar';
import ProductPrice from './ProductPrice';
import ProductAdminButton from './ProductAdminButton';
import { Link } from 'react-router-dom';

function Product({
  id,
  name,
  price,
  rating = 0,
  image,
  direction,
  onDelete,
  category,
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
      <div className='bg-white shadow-lg'>
        <ProductImage
          image={image}
          name={image}
          user={user}
          onClick={() => onWishlist(id)}
          favorited={favorited}
        />
        <div className='px-4'>
          <div className='mb-4'>
            <Link
              to={`/produk?category=${category._id}`}
              className='bg-primary text-yellow-900 tracking-wide rounded-sm px-2 py-1 text-tiny font-bold inline-block mt-2'
            >
              {category?.name?.toUpperCase()}
            </Link>
            <ProductTitle name={name} id={id} />
            <ProductStar rating={5} color='text-yellow-600' size='1.6rem' />
            <ProductPrice price={price} />
          </div>

          {user?.role !== 'admin' && (
            <button
              className='mb-4 p-2 bg-primary text-center block w-full text-xs font-bold text-gray-900'
              onClick={() => onAddToCartHandler(id)}
            >
              Tambah Ke Keranjang
            </button>
          )}

          {user?.role === 'admin' && <ProductAdminButton onDelete={onDelete} id={id} />}
        </div>
      </div>
    );
  }

  return card;
}

export default Product;
