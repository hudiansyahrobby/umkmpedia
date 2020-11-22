import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { resetCategory } from '../actions/categoryActions';
import Alert from '../components/Alert';
import List from '../components/List';

export default function CategoryListPage() {
  const dispatch = useDispatch();
  const { categories, error, success, message } = useSelector((state) => state.category);

  return (
    <Layout>
      <div className='mt-20 px-6'>
        {success && (
          <Alert message={message} success={true} onRemoveAlert={() => dispatch(resetCategory())} />
        )}
        {error && (
          <Alert
            message={message}
            success={false}
            onRemoveAlert={() => dispatch(resetCategory())}
          />
        )}
        <div className='grid grid-cols-1'>
          <List title='Daftar Kategori' lists={categories} />
        </div>
      </div>
    </Layout>
  );
}
