import React, { useEffect } from 'react';
import Input from '../components/Input';
import Button from '../components/Buttons/Button';
import * as Yup from 'yup';
import { resetState, signin } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Formik } from 'formik';
import Layout from '../components/Layout';
import Alert from '../components/Alert';

function SigninPage() {
  const dispatch = useDispatch();
  const { user, success, error, message } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(resetState());
  }, []);

  if (user?.role === 'user') {
    return <Redirect to='/profil' />;
  }

  if (user?.role === 'admin') {
    return <Redirect to='/admin' />;
  }

  return (
    <Layout>
      <div className='w-full h-screen max-w-2xl mx-auto'>
        <div className='w-full px-3 mt-24 mx-auto py-5'>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
              email: Yup.string().required('Wajib Diisi').email('Masukkan Alamat Email yang Valid'),
              password: Yup.string().required('Wajib Diisi'),
            })}
            onSubmit={({ email, password }, { setSubmitting }) => {
              const user = {
                email,
                password,
              };
              dispatch(signin(user));

              setSubmitting(true);
            }}
          >
            <Form className='bg-info shadow-md rounded px-3 pt-6 pb-8 mb-4'>
              <h2 className='font-bold text-2xl tracking-wide text-center'>Masuk ke Akun</h2>
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

              {/* <NavLink to='/lupa-password' className='text-sm text-blue-400 font-bold'>
                Lupa Password ?
              </NavLink> */}
              <div className='mt-2 text-center'>
                <Button
                  background='bg-primary hover:bg-orange-400'
                  variant='font-bold transition duration-300 mx-auto'
                  size='extraBig'
                  type='submit'
                >
                  Masuk
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </Layout>
  );
}

export default SigninPage;
