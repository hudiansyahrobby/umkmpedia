import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import Layout from '../components/Layout';
import { getcategories, resetCategory } from '../actions/categoryActions';
import Alert from '../components/Alert';

import AddCategoryForm from '../components/Forms/AddCategoryForm';
import List from '../components/List';

function AddCategoryPage() {
  const dispatch = useDispatch();
  const { categories, error, loading, success, message } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getcategories());
  }, [dispatch]);

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
        <div className='grid grid-cols-1 sm:grid-cols-2'>
          <AddCategoryForm />
          <List title='Daftar Kategori' lists={categories} />
        </div>
      </div>
    </Layout>
  );
}

export default AddCategoryPage;
