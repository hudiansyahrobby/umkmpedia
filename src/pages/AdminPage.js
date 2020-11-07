import React from 'react';
import AdminCards from '../components/AdminCards/AdminCards';
import Layout from '../components/Layout';
import Table from '../components/Table';
import Title from '../components/Title';

function AdminPage() {
  return (
    <Layout>
      <div className='mt-20'>
        <Title margin='mx-auto' align='text-center'>
          Beranda Admin
        </Title>
        <AdminCards />
        {/* <Table /> */}
      </div>
    </Layout>
  );
}

export default AdminPage;
