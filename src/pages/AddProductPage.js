import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import CreatableSelect from 'react-select/creatable';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';

import Button from '../components/Buttons/Button';
import Input from '../components/Input';
import Title from '../components/Title';
import FileInput from '../components/Forms/FileInput';
import InputLabel from '../components/Forms/InputLabel';
import Layout from '../components/Layout';
import Alert from '../components/Alert';

import { addNewProduct, resetProduct } from '../actions/productActions';
import { addCategories, getcategories } from '../actions/categoryActions';
import { addUnit, getUnits } from '../actions/unitActions';

import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

function AddProductPage() {
  const [image, setImage] = useState('');
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const { message, success, error } = useSelector((state) => state.product);
  const { categories, loading: isCategoryLoading } = useSelector((state) => state.category);
  const { units, loading: isUnitLoading } = useSelector((state) => state.unit);

  const categoryOptions = categories?.map((category) => ({
    value: category._id,
    label: capitalizeFirstLetter(category.name),
  }));

  const unitOptions = units?.map(({ _id, unit }) => ({
    value: _id,
    label: capitalizeFirstLetter(unit),
  }));

  useEffect(() => {
    dispatch(getcategories());
    dispatch(getUnits());
    dispatch(resetProduct());
  }, [dispatch]);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

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
    <Layout>
      <div className='w-full h-screen max-w-6xl mx-auto mt-20'>
        <div className='px-6'>
          <Formik
            initialValues={{
              name: '',
              price: '',
              quantity: '',
              unit: '',
              weight: '',
              category: '',
            }}
            validationSchema={Yup.object({
              name: Yup.string().required('Wajib Diisi'),
              category: Yup.string().required('Wajib Diisi'),
              price: Yup.number().required('Wajib Diisi').min(0, 'Harga Harus Lebih Dari 0'),
              quantity: Yup.number().required('Wajib Diisi').min(0, 'Kuantitas Harus Lebih Dari 0'),
              weight: Yup.number().required('Wajib Diisi').min(0, 'Berat Harus Lebih Dari 0'),
              unit: Yup.string().required('Wajib Diisi'),
            })}
            onSubmit={({ name, price, quantity, weight, unit, category }, { setSubmitting }) => {
              const productData = new FormData();
              productData.append('name', name);
              productData.append('category', category);
              productData.append('price', price);
              productData.append('quantity', quantity);
              productData.append('weight', weight);
              productData.append('unit', unit);
              productData.append('image', image);
              productData.append('description', convertedContent);
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

                <InputLabel id='category' label='Kategori' />
                <Field
                  name='category'
                  component={({ field, form }) => (
                    <CreatableSelect
                      isClearable
                      isDisabled={isCategoryLoading}
                      isLoading={isCategoryLoading}
                      formatCreateLabel={(inputValue) => `Buat "${inputValue}"`}
                      onChange={(option) => form.setFieldValue(field.name, option.value)}
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

                <ErrorMessage name='category' component='p' className='mt-2 text-red-600 text-sm' />

                <Input
                  name='price'
                  type='number'
                  id='price'
                  placeholder='Masukkan Harga Produk'
                  label='Harga Produk'
                />

                <Input
                  name='weight'
                  type='number'
                  id='weight'
                  placeholder='Masukkan Berat Produk'
                  label='Berat Produk (gram)'
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
                          onChange={(option) => form.setFieldValue(field.name, option.label)}
                          onCreateOption={handleCreateUnit}
                          options={unitOptions}
                          value={
                            categoryOptions
                              ? categoryOptions.find((option) => option.value === field.value)
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
                  onEditorStateChange={handleEditorChange}
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
                  image={image}
                  label='Upload Gambar Produk'
                  onChange={(e) => setImage(e.target.files[0])}
                  onDelete={(e) => setImage('')}
                />

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
