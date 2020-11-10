import React from 'react';
import AdminCard from './AdminCard';
import { FaShoppingBag, FaUserCircle, FaMoneyBillAlt } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';

export default function AdminCards() {
  return (
    <div className='mt-8 grid grid-cols-2 md:grid-cols-4 gap-6'>
      <AdminCard icon={<FaShoppingBag />} color='text-green-700' title='Produk' number={23} />
      <AdminCard icon={<FaUserCircle />} color='text-blue-700' title='Akun' number={23} />
      <AdminCard icon={<FaMoneyBillAlt />} color='text-yellow-700' title='Transaksi' number={23} />
      <AdminCard
        icon={<GoGraph />}
        color='text-purple-700'
        title='Pembelian Bulan Ini'
        number={23}
      />
    </div>
  );
}
