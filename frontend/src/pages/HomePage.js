import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Title from '../components/Title';
import Products from '../components/Products/Products';
import { deleteProductById, getProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, deleteFromWishlist } from '../actions/wishlistActions';
import Layout from '../components/Layout';
import ProductSkeleton from '../components/Products/ProductSkeleton';
import { useHistory } from 'react-router-dom';

function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { products, loading } = useSelector((state) => state.product);
  const { wishlists } = useSelector((state) => state.wishlist);
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const onDeleteProductHandler = (id) => {
    dispatch(deleteProductById(id));
  };

  const onAddWishlistHandler = (id) => {
    if (!users?.role) return history.push('/masuk');

    dispatch(addToWishlist(id));
  };

  const onRemoveWishlist = (id) => {
    dispatch(deleteFromWishlist(id));
  };

  return (
    <Layout>
      <Hero />
      <div className='bg-gray-200 pt-6'>
        <div className='px-10'>
          <div className='mt-10'>
            <Title>Produk Baru</Title>
            {loading ? (
              <ProductSkeleton />
            ) : (
              <Products
                products={products}
                onDelete={onDeleteProductHandler}
                wishlists={wishlists}
                onAddWishlist={onAddWishlistHandler}
                onRemoveWishlist={onRemoveWishlist}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
