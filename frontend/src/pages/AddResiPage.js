import React from 'react';
import Input from '../components/Input';
import Button from '../components/Buttons/Button';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import Layout from '../components/Layout';
import { addResi } from '../actions/orderActions';

export default function AddResiPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  return (
    <Layout>
      <div className='w-full h-screen max-w-lg mx-auto'>
        <div className='w-full px-6 mt-24 mx-auto py-5'>
          <Formik
            initialValues={{ resiNumber: '' }}
            validationSchema={Yup.object({
              resiNumber: Yup.string().required('Wajib Diisi'),
            })}
            onSubmit={({ resiNumber }, { setSubmitting }) => {
              const resiData = {
                resiNumber,
              };
              dispatch(addResi(id, resiData, history));
              setSubmitting(false);
            }}
          >
            <Form className='bg-info shadow-md rounded px-8 pt-6 pb-8 mb-4'>
              <h2 className='font-bold text-lg md:text-2xl tracking-wide text-center'>
                Tambah Nomer Resi
              </h2>

              <Input
                name='resiNumber'
                type='text'
                id='resiNumber'
                placeholder='Masukkan No.Resi'
                label='No.Resi'
              />

              <div className='text-center'>
                <Button
                  background='bg-primary hover:bg-orange-400'
                  variant='text-black font-bold transition duration-300'
                  size='big'
                  type='submit'
                >
                  Masukkan Resi
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Layout>
  );
}
