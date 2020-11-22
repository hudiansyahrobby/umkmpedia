import React from 'react';
import AdminCards from '../components/Cards/AdminCards';
import Button from '../components/Buttons/Button';
import Layout from '../components/Layout';
// import Table from '../components/Table/Table';
import Title from '../components/Title';

function AdminPage() {
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

        <AdminCards />
        {/* <Table /> */}
      </div>
    </Layout>
  );
}

export default AdminPage;
