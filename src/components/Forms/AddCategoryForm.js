import React from 'react';
import Button from '../../components/Buttons/Button';
import Input from '../../components/Input';
import Title from '../../components/Title';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { addCategories, resetCategory } from '../../actions/categoryActions';
import { useDispatch } from 'react-redux';

export default function AddCategoryForm() {
  const dispatch = useDispatch();

  return (
    <div className='w-full mx-auto '>
      <div>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={Yup.object({
            name: Yup.string().required('Wajib Diisi'),
          })}
          onSubmit={({ name }, { setSubmitting }) => {
            const categoryName = {
              name,
            };
            dispatch(addCategories(categoryName));
            setSubmitting(false);
            setTimeout(() => {
              dispatch(resetCategory());
            }, 5000);
          }}
        >
          <Form className='shadow-md rounded px-4 pt-6 pb-8 mb-4'>
            <Title align='text-center' margin='mx-auto'>
              Tambahkan Kategori Baru
            </Title>

            <div className='mt-8'>
              <Input
                name='name'
                type='text'
                id='name'
                placeholder='Masukkan Nama Kategori'
                label='Nama Kategori'
              />

              <div className='mt-5 w-48 mx-auto'>
                <Button
                  background='bg-primary hover:bg-orange-400'
                  variant='font-bold transition duration-300 mx-auto'
                  size='extraBig'
                  type='submit'
                >
                  Tambah Kategori
                </Button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
