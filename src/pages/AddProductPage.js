import React from 'react';
import { useState } from 'react';
import Button from '../components/Buttons/Button';
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
import { getcategories } from '../actions/categoryActions';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons';

function AddProductPage() {
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { message, success, error } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);

  const units = ['kg', 'gram', 'buah', 'meter', 'kotak'];

  useEffect(() => {
    dispatch(getcategories());
    dispatch(resetProduct());
  }, [dispatch]);
  return (
    <Layout>
      <div className='w-full h-screen max-w-lg mx-auto mt-20'>
        <div className='px-6'>
          <Formik
            initialValues={{
              name: '',
              price: '',
              quantity: '',
              description: '',
              unit: '',
              category: '',
            }}
            validationSchema={Yup.object({
              name: Yup.string().required('Wajib Diisi'),
              category: Yup.string().required('Wajib Diisi'),
              price: Yup.number().required('Wajib Diisi').min(0, 'Harga Harus Lebih Dari 0'),
              quantity: Yup.number().required('Wajib Diisi').min(0, 'Kuantitas Harus Lebih Dari 0'),
              unit: Yup.string().required('Wajib Diisi'),
              description: Yup.string()
                .required('Wajib Diisi')
                .min(100, 'Deskripsi minimal 100 karakter'),
            })}
            onSubmit={(
              { name, category, price, quantity, description, unit },
              { setSubmitting },
            ) => {
              const productData = new FormData();
              productData.append('name', name);
              productData.append('category', category);
              productData.append('price', price);
              productData.append('quantity', quantity);
              productData.append('unit', unit);
              productData.append('image', image);
              productData.append('description', description);

              dispatch(addNewProduct(productData, history));
              setSubmitting(false);
              setTimeout(() => {
                dispatch(resetProduct());
              }, 5000);
            }}
          >
            <Form className='bg-info shadow-md rounded px-4 pt-6 pb-8 mb-4'>
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
                  name='category'
                  as='select'
                  id='category'
                  data={categories}
                  label='Pilih Kategori'
                  option='Pilih Kategori'
                />

                <Input
                  name='price'
                  type='number'
                  id='price'
                  placeholder='Masukkan Harga Produk'
                  label='Harga Produk'
                />

                <div className='grid grid-cols-2 gap-3'>
                  <Input
                    name='quantity'
                    type='number'
                    id='quantity'
                    placeholder='Jumlah Produk'
                    label='Jumlah Produk'
                  />

                  <Input
                    name='unit'
                    as='select'
                    id='unit'
                    data={units}
                    label='Satuan Produk'
                    option='Satuan'
                  />
                </div>

                <Input
                  name='description'
                  as='textarea'
                  id='description'
                  placeholder='Masukkan Deskripsi Produk'
                  label='Deskirpsi Produk'
                />

                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={image}>
                  Upload Gambar Produk
                </label>
                <div className='relative w-64 h-48 mx-auto'>
                  <Input
                    id='image'
                    accept='image/*'
                    as='file'
                    name='image'
                    onChange={(e) => setImage(e.target.files[0])}
                  />

                  {image && (
                    <>
                      <img
                        src={URL.createObjectURL(image)}
                        alt='preview'
                        className='w-64 h-48 rounded-lg absolute inset-0'
                      />
                      <IconContext.Provider
                        value={{
                          color: 'text-white',
                          size: '1.2rem',
                          className: 'absolute top-0 right-0 mt-2 mr-2',
                        }}
                      >
                        <button onClick={() => setImage('')}>
                          <IoMdClose />
                        </button>
                      </IconContext.Provider>
                    </>
                  )}
                </div>

                <div className='mt-5 w-48 mx-auto'>
                  <Button
                    background='bg-primary hover:bg-orange-400'
                    variant='font-bold transition duration-300 mx-auto'
                    size='extraBig'
                    type='submit'
                  >
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
