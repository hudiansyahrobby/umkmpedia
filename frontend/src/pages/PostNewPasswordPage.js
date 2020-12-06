import React from 'react';
import Input from '../components/Input';
import Button from '../components/Buttons/Button';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import Layout from '../components/Layout';
import { postNewPassword } from '../actions/userActions';

function PostNewPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { resetToken } = useParams();

  return (
    <Layout>
      <div className='w-full h-screen max-w-lg mx-auto'>
        <div className='w-full px-6 mt-24 mx-auto py-5'>
          <Formik
            initialValues={{ password: '' }}
            validationSchema={Yup.object({
              password: Yup.string().min(6, 'Password Minimal 6 Karakter').required('Wajib Diisi'),
            })}
            onSubmit={({ password }, { setSubmitting }) => {
              const userPassword = {
                password,
              };
              dispatch(postNewPassword(userPassword, resetToken, history));
              setSubmitting(false);
            }}
          >
            <Form className='bg-info shadow-md rounded px-8 pt-6 pb-8 mb-4'>
              <h2 className='font-bold text-2xl tracking-wide text-center'>Ubah Password</h2>
              <div className='flex justify-center mt-4 text-center'></div>
              <Input
                name='password'
                type='password'
                id='password'
                placeholder='Masukkan Password Baru'
                label='Password'
              />
              <div className='mt-2 text-center'>
                <Button
                  background='bg-primary hover:bg-orange-400'
                  variant='font-bold transition duration-300 mx-auto'
                  size='extraBig'
                  type='submit'
                >
                  Change Password
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Layout>
  );
}

export default PostNewPasswordPage;
