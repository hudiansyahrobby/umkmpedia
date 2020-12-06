import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import CreatableSelect from 'react-select/creatable';

import Button from '../components/Buttons/Button';
import Input from '../components/Input';
import Title from '../components/Title';
import Layout from '../components/Layout';
import Alert from '../components/Alert';
import FileInput from '../components/Forms/FileInput';
import InputLabel from '../components/Forms/InputLabel';

import {
  updateProductById,
  getProductById,
  resetProduct,
  resetStateProduct,
} from '../actions/productActions';
import { addCategories } from '../actions/categoryActions';
import { addUnit, getUnits } from '../actions/unitActions';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

function EditProductPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const { message, success, error, product } = useSelector((state) => state.product);
  const { categories, loading: isCategoryLoading } = useSelector((state) => state.category);
  const { units, loading: isUnitLoading } = useSelector((state) => state.unit);

  const [image, setImage] = useState('');
  const [editImage, setEditImage] = useState(false);
  const [editorState, setEditorState] = useState('');
  console.log(editorState);
  useEffect(() => {
    if (product?.length > 0) {
      console.log('rednder');
      setEditorState(() =>
        EditorState.createWithContent(
          ContentState.createFromBlockArray(htmlToDraft(product[0].description)),
        ),
      );
    }
  }, [product]);

  console.log('product', product);
  const categoryOptions = categories?.map((category) => ({
    value: category._id,
    label: capitalizeFirstLetter(category.name),
  }));

  const unitOptions = units?.map(({ _id, unit }) => ({
    value: _id,
    label: capitalizeFirstLetter(unit),
  }));

  const getIntialValues = useCallback(() => {
    dispatch(getUnits());
    dispatch(getProductById(id));
    dispatch(resetProduct());
  }, [id, dispatch]);

  useEffect(() => {
    getIntialValues();
    return () => {
      dispatch(resetStateProduct());
    };
  }, [dispatch, id, getIntialValues]);

  useEffect(() => {
    if (product?.length > 0) {
      setImage(product[0].image);
    }
  }, [product]);

  const handleCreateCategory = (name) => {
    const categoryData = {
      name,
    };
    dispatch(addCategories(categoryData));
  };

  const handleCreateUnit = (unit) => {
    const unitData = {
      unit,
    };
    dispatch(addUnit(unitData));
  };

  return (
    <>
      <Layout>
        {product?.length > 0 ? (
          <div className='w-full h-screen max-w-lg mx-auto mt-20'>
            <div className='px-6'>
              <Formik
                initialValues={{
                  name: product[0].name,
                  price: product[0].price,
                  quantity: product[0].quantity,
                  category: product[0].category,
                  unit: product[0].unit._id,
                  weight: product[0].weight,
                }}
                validationSchema={Yup.object({
                  name: Yup.string().required('Wajib Diisi'),
                  price: Yup.number()
                    .required('Wajib Diisi')
                    .min(0, 'Harga Harus Lebih besar dari 0'),
                  quantity: Yup.number()
                    .required('Wajib Diisi')
                    .min(0, 'Jumlah harus lebih besar dari nol'),
                  weight: Yup.number().required('Wajib Diisi').min(0, 'Berat Harus Lebih Dari 0'),
                  category: Yup.string().required('Wajib Diisi'),
                  unit: Yup.string().required('Wajib Diisi'),
                })}
                onSubmit={(
                  { name, price, quantity, category, weight, unit },
                  { setSubmitting },
                ) => {
                  const description = draftToHtml(convertToRaw(editorState.getCurrentContent()));
                  const productData = new FormData();
                  productData.append('name', name);
                  productData.append('price', price);
                  productData.append('quantity', quantity);
                  productData.append('unit', unit);
                  productData.append('weight', weight);
                  productData.append('category', category);
                  productData.append('image', image);
                  productData.append('description', description);
                  dispatch(updateProductById(id, productData, history));
                  setSubmitting(false);
                  setTimeout(() => {
                    dispatch(resetProduct());
                  }, 5000);
                }}
              >
                <Form className='bg-info shadow-md rounded px-4 pt-6 pb-8 mb-4'>
                  <Title align='text-center' margin='mx-auto'>
                    Edit Produk Anda
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

                    <InputLabel id='category' label='Kategori' />
                    <Field
                      name='category'
                      component={({ field, form }) => (
                        <CreatableSelect
                          isClearable
                          isDisabled={isCategoryLoading}
                          isLoading={isCategoryLoading}
                          formatCreateLabel={(inputValue) => `Buat "${inputValue}"`}
                          onChange={(option) => {
                            console.log(option);
                            if (option) {
                              form.setFieldValue(field.name, option.value);
                            } else {
                              form.setFieldValue(field.name, '');
                            }
                          }}
                          placeholder='Pilih Kategori'
                          onCreateOption={handleCreateCategory}
                          options={categoryOptions}
                          value={
                            categoryOptions
                              ? categoryOptions.find((option) => option.value === field.value)
                              : ''
                          }
                          onBlur={field.onBlur}
                        />
                      )}
                    />

                    <ErrorMessage
                      name='category'
                      component='p'
                      className='mt-2 text-red-600 text-sm'
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

                      <div>
                        <InputLabel id='unit' label='Satuan' />

                        <Field
                          name='unit'
                          component={({ field, form }) => (
                            <CreatableSelect
                              isClearable
                              isDisabled={isUnitLoading}
                              isLoading={isUnitLoading}
                              placeholder='Pilih Satuan'
                              formatCreateLabel={(inputValue) => `Buat "${inputValue}"`}
                              onChange={(option) => {
                                if (option) {
                                  form.setFieldValue(field.name, option.value);
                                } else {
                                  form.setFieldValue(field.name, '');
                                }
                              }}
                              onCreateOption={handleCreateUnit}
                              options={unitOptions}
                              value={
                                unitOptions
                                  ? unitOptions.find((option) => option.value === field.value)
                                  : ''
                              }
                              name='unit'
                              onBlur={field.onBlur}
                            />
                          )}
                        />

                        <ErrorMessage
                          name='satuan'
                          component='p'
                          className='mt-2 text-red-600 text-sm'
                        />
                      </div>
                    </div>

                    <InputLabel id='description' label='Deskirpsi Produk' />

                    <Editor
                      editorState={editorState}
                      onEditorStateChange={(content) => setEditorState(content)}
                      wrapperClassName='p-1 border border-gray-300'
                      editorClassName='bg-gray-400 p-1 border border-gray-300'
                      editorStyle={{ height: '250px' }}
                      toolbarClassName='border border-gray-300'
                    />

                    <FileInput
                      id='image'
                      accept='image/*'
                      as='file'
                      name='image'
                      editImageState={editImage}
                      image={image}
                      label='Upload Gambar Produk'
                      onChange={(e) => {
                        setEditImage(true);
                        setImage(e.target.files[0]);
                      }}
                      onDelete={(e) => setImage('')}
                    />

                    <div className='mt-5 w-48 mx-auto'>
                      <Button
                        background='bg-primary hover:bg-orange-400'
                        variant='font-bold transition duration-300 mx-auto'
                        size='extraBig'
                        type='submit'
                      >
                        Edit Produk
                      </Button>
                    </div>
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
