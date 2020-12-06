import React, { useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Buttons/Button';
import * as Yup from 'yup';
import { resetState, signup } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Form, Formik } from 'formik';
import Layout from '../components/Layout';
import Alert from '../components/Alert';

function SignupPage() {
  const dispatch = useDispatch();
  const { authenticated, success, error, message } = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    dispatch(resetState());
  }, []);

  if (authenticated) {
    return <Redirect to='/user' />;
  }

  return (
    <Layout>
      <div className='w-full h-screen max-w-lg mx-auto'>
        <div className='w-full px-6 mt-24 mx-auto py-5'>
          <Formik
            initialValues={{ name: '', email: '', password: '', password2: '' }}
            validationSchema={Yup.object({
              name: Yup.string().required('Wajib Diisi'),
              email: Yup.string().required('Wajib Diisi').email('Masukkan Alamat Email yang Valid'),
              password: Yup.string().min(6, 'Password Minimal 6 Karakter').required('Wajib Diisi'),
              password2: Yup.string().min(6, 'Password Minimal 6 Karakter').required('Wajib Diisi'),
            })}
            onSubmit={({ name, email, password, password2 }, { setSubmitting }) => {
              const user = {
                name,
                email,
                password,
                password2,
              };
              dispatch(signup(user, history));
              setSubmitting(false);
            }}
          >
            <Form className='bg-info shadow-md rounded px-8 pt-6 pb-8 mb-4'>
              <h2 className='font-bold text-2xl tracking-wide text-center'>Buat Akun Baru</h2>
              {success && (
                <Alert
                  message={message}
                  success={true}
                  onRemoveAlert={() => dispatch(resetState())}
                />
              )}
              {error && (
                <Alert
                  message={message}
                  success={false}
                  onRemoveAlert={() => dispatch(resetState())}
                />
              )}
              <Input name='name' type='text' id='name' placeholder='Masukkan Nama' label='Name' />
              <Input
                name='email'
                type='email'
                id='email'
                placeholder='Masukkan Alamat Email'
                label='Email'
              />

              <Input
                name='password'
                type='password'
                id='password'
                placeholder='Masukkan Password'
                label='Password'
              />

              <Input
                name='password2'
                type='password'
                id='password2'
                placeholder='Masukkan Kembali Password'
                label='Password'
              />
              <div className='text-center'>
                <Button
                  background='bg-primary hover:bg-orange-400'
                  variant='text-black font-bold transition duration-300'
                  size='extraBig'
                  type='submit'
                >
                  Buat Akun
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Layout>
  );
}

export default SignupPage;
