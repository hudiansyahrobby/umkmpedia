import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import Table from '../components/Table/Table';
import Title from '../components/Title';
import { getOrder, getOrderByUser, resetOrder } from '../actions/orderActions';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';

export default function HistoryPage(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.user);
  const { orders, totalPage, loading } = useSelector((state) => state.order);

  // Get page and search query
  const query = new URLSearchParams(props.location.search);
  const page = query.get('page') || 1;

  const onHandlePagination = (event) => {
    const data = +event.selected;
    history.push(`riwayat?page=${data + 1}`);
  };

  const header = [
    {
      title: 'ID Transaksi',
    },
    {
      title: 'Produk Pembelian',
    },
    {
      title: 'Harga',
    },
    {
      title: 'Detail',
    },
  ];

  useEffect(() => {
    if (user?.role === 'user') dispatch(getOrderByUser(page));
    if (user?.role === 'admin') dispatch(getOrder());

    return () => {
      dispatch(resetOrder());
    };
  }, [dispatch, page]);

  return (
    <Layout>
      <div className='mt-24 max-w-screen-xl'>
        <Title margin='mx-auto' align='text-center'>
          {user?.role === 'user' ? 'Riwayat Pembelian' : 'Riwayat Penjualan'}
        </Title>

        {loading ? (
          <Spinner />
        ) : orders.length > 0 ? (
          <>
            <Table header={header} row={orders} />
            <ReactPaginate
              previousLabel={'<<'}
              nextLabel={'>>'}
              breakLabel={'...'}
              pageCount={totalPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={4}
              onPageChange={onHandlePagination}
              pageClassName={'mr-2 text-orange-800 px-2'}
              previousClassName={'mr-2 text-orange-800'}
              nextClassName={'text-orange-800'}
              containerClassName={
                'flex justify-center mt-8 py-3 text-sm bg-primary rounded-md font-bold'
              }
              activeClassName={'text-orange-900 bg-orange-300 rounded-md'}
              forcePage={+page - 1}
            />
          </>
        ) : (
          <h1 className='text-center mt-8'>
            {user?.role === 'user'
              ? 'Anda Belum Pernah Melakukan Pemesanan'
              : 'Belum Ada Barang Yang Terjual'}
          </h1>
        )}
      </div>
    </Layout>
  );
}
