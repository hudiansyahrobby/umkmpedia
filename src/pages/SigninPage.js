import React from 'react';
// import CircleButton from '../components/Buttons/CircleButtons/CircleButton';
import Input from '../components/Input';
import Button from '../components/Buttons/Button';
import * as Yup from 'yup';
import { signin } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Form, Formik } from 'formik';
import Layout from '../components/Layout';

function SigninPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  if (user?.authenticated) {
    return <Redirect to='/profil' />;
  }

  return (
    <Layout>
      <div className='w-full h-screen max-w-lg mx-auto'>
        <div className='w-full px-6 mt-24 mx-auto py-5'>
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
              dispatch(signin(user, history));
              setSubmitting(false);
            }}
          >
            <Form className='bg-info shadow-md rounded px-8 pt-6 pb-8 mb-4'>
              <h2 className='font-bold text-2xl tracking-wide text-center'>Masuk ke Akun</h2>
              <div className='flex justify-center mt-4 text-center'>
                {/* <CircleButton icon={<FacebookIcon />} border='border-blue-dark' />
                <CircleButton icon={<GoogleIcon />} border='border-red-600' />
                <CircleButton icon={<TwitterIcon />} border='border-blue-light' /> */}
              </div>

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

              <div className='text-center'>
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
