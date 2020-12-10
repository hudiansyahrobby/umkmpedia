import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import CreatableSelect from 'react-select/creatable';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

import Button from '../components/Buttons/Button';
import Input from '../components/Input';
import Title from '../components/Title';
import FileInput from '../components/Forms/FileInput';
import InputLabel from '../components/Forms/InputLabel';
import Layout from '../components/Layout';
import Alert from '../components/Alert';

import { addNewProduct, resetProduct } from '../actions/productActions';
import { addCategories } from '../actions/categoryActions';
import { addUnit, getUnits } from '../actions/unitActions';

import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

function AddProductPage() {
  const [image, setImage] = useState('');
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const { message, success, error } = useSelector((state) => state.product);
  const { categories, loading: isCategoryLoading } = useSelector((state) => state.category);
  const { units, loading: isUnitLoading } = useSelector((state) => state.unit);

  const dispatch = useDispatch();
  const history = useHistory();

  const categoryOptions = useMemo(
    () =>
      categories?.map((category) => ({
        value: category._id,
        label: capitalizeFirstLetter(category.name),
      })),
    [categories],
  );

  const unitOptions = useMemo(
    () =>
      units?.map(({ _id, unit }) => ({
        value: _id,
        label: capitalizeFirstLetter(unit),
      })),
    [units],
  );

  useEffect(() => {
    dispatch(getUnits());
    dispatch(resetProduct());
  }, [dispatch]);

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
      <div className='w-full mx-auto mt-20'>
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
              const description = draftToHtml(convertToRaw(editorState.getCurrentContent()));
              const productData = new FormData();
              productData.append('name', name);
              productData.append('category', category);
              productData.append('price', price);
              productData.append('quantity', quantity);
              productData.append('weight', weight);
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

                <InputLabel id='category' label='Kategori' />
                <Field
                  name='category'
                  component={({ field, form }) => (
                    <CreatableSelect
                      maxMenuHeight={200}
                      isClearable
                      isDisabled={isCategoryLoading}
                      isLoading={isCategoryLoading}
                      formatCreateLabel={(inputValue) => `Buat "${inputValue}"`}
                      onChange={(option) => {
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
                          maxMenuHeight={150}
                          isClearable
                          isDisabled={isUnitLoading}
                          isLoading={isUnitLoading}
                          placeholder='Pilih Satuan'
                          formatCreateLabel={(inputValue) => `Buat "${inputValue}"`}
                          onChange={(option) => form.setFieldValue(field.name, option.value)}
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
                  image={image}
                  editImageState={true}
                  label='Upload Gambar Produk'
                  onChange={(e) => setImage(e.target.files[0])}
                  onDelete={() => setImage('')}
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
