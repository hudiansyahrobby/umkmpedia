import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, resetStateProduct } from '../actions/productActions';

import { useHistory, useParams } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import { addToWishlist, deleteFromWishlist } from '../actions/wishlistActions';
import Layout from '../components/Layout';
import ProductStar from '../components/Products/ProductStar';
import ProductDetailImage from '../components/Products/ProductDetailImage';
import ProductPrice from '../components/Products/ProductPrice';
import CartButton from '../components/Buttons/CartButton';
import FavoriteButton from '../components/Buttons/FavoriteButton';
import ProductDetailQuantity from '../components/Products/ProductDetailQuantity';
import ProductDetailInfo from '../components/Products/ProductDetailInfo';
import ProductDetailTitle from '../components/Products/ProductDetailTitle';

function ProductDetailPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { product } = useSelector((state) => state.product);
  const { wishlists } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();

  const favorited = wishlists?.some((wishlist) => wishlist.productId === id);

  useEffect(() => {
    dispatch(getProductById(id));

    return function cleanup() {
      dispatch(resetStateProduct());
    };
  }, [dispatch, id]);

  const onAddToCartHandler = (id) => {
    if (!user?.role) history.push('/masuk');
    dispatch(addToCart(id));
  };

  const onAddToWishlistHandler = (id) => {
    if (!user?.role) history.push('/masuk');
    dispatch(addToWishlist(id));
  };

  const onRemoveFromWishlistHandler = (id) => {
    dispatch(deleteFromWishlist(id));
  };

  let productElement;

  if (product?.length > 0) {
    const { image, name, price, quantity, _id, description, unit } = product[0];

    productElement = (
      <div className='p-6'>
        <ProductDetailImage name={name} image={image} />

        <div className='mt-5 flex items-center justify-between'>
          <div>
            <ProductDetailTitle name={name} />
            <div className='mt-2 flex items-center'>
              <ProductStar rating={5} size='1.3rem' color='text-red-600' />
            </div>
            <ProductPrice price={price} />
          </div>

          {user?.role !== 'admin' && (
            <div className='flex align-center'>
              <CartButton size='2.7rem' styling='mr-2' onClick={() => onAddToCartHandler(_id)} />

              <FavoriteButton
                favorited={favorited}
                onClick={() =>
                  `${favorited ? onRemoveFromWishlistHandler(_id) : onAddToWishlistHandler(_id)}`
                }
                size='2.7rem'
              />
            </div>
          )}
        </div>

        <ProductDetailQuantity quantity={quantity} unit={unit} />
        <ProductDetailInfo description={description} />
      </div>
    );
  }

  return (
    <Layout>
      <div className='w-full h-screen max-w-xl mx-auto mt-20'>{productElement}</div>
    </Layout>
  );
}

export default ProductDetailPage;
