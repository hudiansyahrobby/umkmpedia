import React from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table/Table';
import Title from '../components/Title';

export default function HistoryPage() {
  return (
    <Layout>
      <div className='mt-24 max-w-screen-xl'>
        <Title margin='mx-auto' align='text-center'>
          Riwayat Pembelian
        </Title>

        <Table title='Daftar Pembelian' />
      </div>
    </Layout>
  );
}
