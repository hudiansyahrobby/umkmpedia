import React, { useEffect } from 'react';
import Title from '../components/Title';
import { deleteFromWishlist, getWishlist } from '../actions/wishlistActions';
import { useDispatch, useSelector } from 'react-redux';
import Wishlists from '../components/Wishlists/Wishlists';
import Layout from '../components/Layout';
import ProductSkeleton from '../components/Products/ProductSkeleton';

function WishlistPage() {
  const dispatch = useDispatch();
  const { wishlists, loading } = useSelector((state) => state.wishlist);

  const onDeleteProductHandler = (id) => {
    dispatch(deleteFromWishlist(id));
  };

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const onRemoveWishlist = (id) => {
    dispatch(deleteFromWishlist(id));
  };

  return (
    <Layout>
      <div className='px-10 mt-20'>
        <Title align='text-center' margin='mx-auto'>
          Daftar Keinginan
        </Title>
        {loading ? (
          <ProductSkeleton />
        ) : (
          <Wishlists
            wishlists={wishlists}
            onDelete={onDeleteProductHandler}
            onRemoveWishlist={onRemoveWishlist}
          />
        )}
      </div>
    </Layout>
  );
}

export default WishlistPage;
