import React, { useEffect } from 'react';
import AdminCards from '../components/Cards/AdminCards';
import Button from '../components/Buttons/Button';
import Layout from '../components/Layout';
// import Table from '../components/Table/Table';
import Title from '../components/Title';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, resetOrder } from '../actions/orderActions';
import { useHistory } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Table from '../components/Table/Table';
import { getProducts } from '../actions/productActions';
import { getTotalUsers } from '../actions/userActions';

function AdminPage(props) {
  const header = [
    {
      title: 'Produk Pembelian',
    },
    {
      title: 'Jumlah Pembelian',
    },
    {
      title: 'Harga',
    },
  ];

  const dispatch = useDispatch();

  const history = useHistory();

  // Get page and search query
  const query = new URLSearchParams(props.location.search);
  const page = query.get('page') || 1;

  const { orders, totalPage, totalOrders } = useSelector((state) => state.order);
  const { totalProducts } = useSelector((state) => state.product);
  const { totalUsers } = useSelector((state) => state.user);

  const onHandlePagination = (event) => {
    const data = +event.selected;
    history.push(`riwayat-pembelian?page=${data + 1}`);
  };

  useEffect(() => {
    dispatch(getOrder(page));
    dispatch(getProducts());
    dispatch(getTotalUsers());

    return () => {
      dispatch(resetOrder());
    };
  }, [dispatch, page]);

  return (
    <Layout>
      <div className='mt-20 mx-3'>
        <Title margin='mx-auto' align='text-center'>
          Beranda Admin
        </Title>
        <div className='text-right mt-4'>
          <Button
            link='/admin/daftar-kategori'
            background='bg-primary hover:bg-orange-400'
            variant='mr-2 text-black font-bold transition duration-300'
            size='small'
          >
            Daftar Kategori
          </Button>
          <Button
            link='/admin/tambah-produk'
            background='bg-primary hover:bg-orange-400'
            variant='text-black font-bold transition duration-300'
            size='small'
          >
            Tambah Produk
          </Button>
        </div>

        <AdminCards
          totalOrders={totalOrders}
          totalProducts={totalProducts}
          totalUsers={totalUsers}
        />

        <Table header={header} row={orders} />

        <ReactPaginate
          previousLabel={'Sebelumnya'}
          nextLabel={'Selanjutnya'}
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
      </div>
    </Layout>
  );
}

export default AdminPage;
