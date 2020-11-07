import React from 'react';
import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import Title from '../components/Title';
import { addNewProduct, resetProduct } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import Alert from '../components/Alert';

function AddProductPage() {
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { message, success, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(resetProduct());
  }, [dispatch]);
  return (
    <Layout>
      <div className='w-full h-screen max-w-lg mx-auto mt-20'>
        <div className='px-6'>
          <Formik
            initialValues={{ name: '', price: '', quantity: '', description: '' }}
            validationSchema={Yup.object({
              name: Yup.string().required('Wajib Diisi'),
              price: Yup.number().required('Wajib Diisi').min(0, 'Harga Harus Lebih Dari 0'),
              quantity: Yup.number().required('Wajib Diisi').min(0, 'Kuantitas Harus Lebih Dari 0'),
              description: Yup.string()
                .required('Wajib Diisi')
                .min(100, 'Deskripsi minimal 100 karakter'),
            })}
            onSubmit={({ name, price, quantity, description }, { setSubmitting }) => {
              const productData = new FormData();
              productData.append('name', name);
              productData.append('price', price);
              productData.append('quantity', quantity);
              productData.append('image', image);
              productData.append('description', description);

              dispatch(addNewProduct(productData, history));
              setSubmitting(false);
              setTimeout(() => {
                dispatch(resetProduct());
              }, 5000);
            }}
          >
            <Form className='bg-info shadow-md rounded px-8 pt-6 pb-8 mb-4'>
              <Title align='text-center' margin='mx-auto'>
                Tambahkan Produk Anda
              </Title>

              {success && (
                <Alert
                  message={message}
                  success={true}
                  onRemoveAlert={() => dispatch(resetProduct())}
                />
              )}
              {error && (
                <Alert
                  message={message}
                  success={false}
                  onRemoveAlert={() => dispatch(resetProduct())}
                />
              )}
              <div className='mt-8'>
                <Input
                  name='name'
                  type='text'
                  id='name'
                  placeholder='Masukkan Nama Produk'
                  label='Nama Produk'
                />

                <Input
                  name='price'
                  type='number'
                  id='price'
                  placeholder='Masukkan Harga Produk'
                  label='Harga Produk'
                />

                <Input
                  name='quantity'
                  type='number'
                  id='quantity'
                  placeholder='Masukkan Jumlah Produk'
                  label='Jumlah Produk'
                />

                <Input
                  name='description'
                  as='textarea'
                  id='description'
                  placeholder='Masukkan Deskripsi Produk'
                  label='Deskirpsi Produk'
                />

                <Input
                  label='Upload Gambar Produk'
                  id='image'
                  accept='image/*'
                  as='file'
                  name='image'
                  onChange={(e) => setImage(e.target.files[0])}
                />

                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt='preview'
                    className='w-40 h-48 mb-4 rounded-lg mx-auto'
                  />
                )}
                {success && (
                  <Alert
                    message={message}
                    success={true}
                    onRemoveAlert={() => dispatch(resetProduct())}
                  />
                )}
                {error && (
                  <Alert
                    message={message}
                    success={false}
                    onRemoveAlert={() => dispatch(resetProduct())}
                  />
                )}
                <div className='mt-5 w-48 mx-auto'>
                  <Button background='bg-red-hell' size='extraBig'>
                    Tambah Produk
                  </Button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Layout>
  );
}

export default AddProductPage;
