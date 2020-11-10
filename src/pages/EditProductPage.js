import React from 'react';
import { useState } from 'react';
import Button from '../components/Buttons/Button';
import Input from '../components/Input';
import Title from '../components/Title';
import {
  addNewProduct,
  getProductById,
  resetProduct,
  resetStateProduct,
} from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import Alert from '../components/Alert';

function EditProductPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(resetProduct());
    return function cleanup() {
      dispatch(resetStateProduct());
    };
  }, [dispatch, id]);

  const [image, setImage] = useState('');
  const history = useHistory();
  const { brands } = useSelector((state) => state.brand);
  const { message, success, error, product } = useSelector((state) => state.product);

  return (
    <>
      <Layout>
        {product ? (
          <div className='w-full h-screen max-w-lg mx-auto mt-20'>
            <div className='px-6'>
              <Formik
                initialValues={{
                  name: product.name,
                  price: product.price,
                  quantity: product.quantity,
                  brand: product.brand,
                  description: product.description,
                }}
                validationSchema={Yup.object({
                  name: Yup.string().required('Required'),
                  price: Yup.number().required('Required').min(0, 'Price must be greater than 0'),
                  quantity: Yup.number()
                    .required('Required')
                    .min(0, 'Quantity must be greater than 0'),
                  brand: Yup.string().required('Required'),
                  description: Yup.string()
                    .required('Required')
                    .min(100, 'At least 100 characters'),
                })}
                onSubmit={({ name, price, quantity, brand, description }, { setSubmitting }) => {
                  const productData = new FormData();
                  productData.append('name', name);
                  productData.append('price', price);
                  productData.append('quantity', quantity);
                  productData.append('brand', brand);
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
                    Edit Your Product
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
                  <Input
                    name='name'
                    type='text'
                    id='name'
                    placeholder='Enter Product Name'
                    label='Name'
                  />

                  <Input
                    name='price'
                    type='number'
                    id='price'
                    placeholder='Enter Product Price'
                    label='Price'
                  />

                  <Input
                    name='quantity'
                    type='number'
                    id='quantity'
                    placeholder='Enter Product Quantity'
                    label='Quantity'
                  />

                  <Input
                    name='brand'
                    as='select'
                    data={brands}
                    id='brand'
                    option='Choose Product Brand'
                    placeholder='Enter Product Brand'
                    label='Brand'
                  />

                  <Input
                    name='description'
                    as='textarea'
                    id='description'
                    placeholder='Enter Product Description'
                    label='Description'
                  />

                  <Input
                    label='Upload Your Image'
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
                      Edit Product
                    </Button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </Layout>
    </>
  );
}

export default EditProductPage;
