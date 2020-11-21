import React from 'react';
import Button from '../components/Buttons/Button';
import Input from '../components/Input';
import Title from '../components/Title';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { resetCategory, updateCategoryById, getCategoryById } from '../actions/categoryActions';
import Alert from '../components/Alert';
import { useHistory, useParams } from 'react-router-dom';

export default function EditCategoryPage() {
  const dispatch = useDispatch();
  const { category, error, success, message } = useSelector((state) => state.category);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCategoryById(id));
  }, [dispatch, id]);

  return (
    <Layout>
      {category.length > 0 && (
        <div className='mt-20 px-6 w-full mx-auto'>
          {success && (
            <Alert
              message={message}
              success={true}
              onRemoveAlert={() => dispatch(resetCategory())}
            />
          )}
          {error && (
            <Alert
              message={message}
              success={false}
              onRemoveAlert={() => dispatch(resetCategory())}
            />
          )}
          <div>
            <Formik
              initialValues={{ name: category[0].name }}
              validationSchema={Yup.object({
                name: Yup.string().required('Wajib Diisi'),
              })}
              onSubmit={({ name }, { setSubmitting }) => {
                const categoryName = {
                  name,
                };
                dispatch(updateCategoryById(id, categoryName, history));
                setSubmitting(false);
                setTimeout(() => {
                  dispatch(resetCategory());
                }, 5000);
              }}
            >
              <Form className='shadow-md rounded px-4 pt-6 pb-8 mb-4'>
                <Title align='text-center' margin='mx-auto'>
                  Edit Kategori
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
                      Edit Kategori
                    </Button>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </Layout>
  );
}
