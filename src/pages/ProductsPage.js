import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import Products from '../components/Products/Products';
import { deleteProductById, getAllProducts, searchProduct } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, deleteFromWishlist, getWishlist } from '../actions/wishlistActions';
import Layout from '../components/Layout';
import ProductSkeleton from '../components/Products/ProductSkeleton';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

function ProductsPage(props) {
  const [search, setSearch] = useState('');

  const { products, totalPage, loading } = useSelector((state) => state.product);
  const { wishlists } = useSelector((state) => state.wishlist);

  // Get page and search query
  const query = new URLSearchParams(props.location.search);
  const page = query.get('page') || 1;
  const searchQuery = query.get('search') || search;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(searchProduct(searchQuery, page));
    dispatch(getWishlist());
  }, [dispatch, page]);

  const onSearchHandler = (e) => {
    e.preventDefault();
    console.log('SEARCH QUERY', searchQuery);
    console.log('SEARCH ', search);
    history.push(`products?search=${search}&page=1`);
    dispatch(searchProduct(search, page));
  };

  const onDeleteProductHandler = (id) => {
    dispatch(deleteProductById(id));
  };

  const onHandlePagination = (event) => {
    const data = +event.selected;
    history.push(`products?search=${search}&page=${data + 1}`);
  };

  const onAddWishlistHandler = (id) => {
    dispatch(addToWishlist(id));
  };

  const onRemoveWishlist = (id) => {
    dispatch(deleteFromWishlist(id));
  };

  return (
    <Layout>
      <div className='px-10 mt-20'>
        <Title align='text-center' margin='mx-auto'>
          All Products
        </Title>
        <SearchBar
          onSearch={(e) => setSearch(e.target.value)}
          onSubmit={onSearchHandler}
          value={search}
        />
        {loading ? (
          <ProductSkeleton />
        ) : (
          <>
            <Products
              products={products}
              onDelete={onDeleteProductHandler}
              wishlists={wishlists}
              onAddWishlist={onAddWishlistHandler}
              onRemoveWishlist={onRemoveWishlist}
            />

            <ReactPaginate
              previousLabel={'Sebelumnya'}
              nextLabel={'Selanjutnya'}
              breakLabel={'...'}
              pageCount={totalPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={4}
              onPageChange={onHandlePagination}
              pageClassName={'mr-2 text-red-700 px-2'}
              previousClassName={'mr-2 text-red-700'}
              nextClassName={'text-red-700'}
              containerClassName={'flex justify-center mt-8 py-4  bg-red-200 font-bold'}
              activeClassName={'text-red-900 bg-red-300 rounded-md'}
              forcePage={+page - 1}
            />
          </>
        )}
      </div>
    </Layout>
  );
}

export default ProductsPage;
