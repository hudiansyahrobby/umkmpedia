import React from 'react';
import CircleButton from '../components/CircleButtons/CircleButton';
import Input from '../components/Input';
import Button from '../components/Button';
import FacebookIcon from '../components/icons/FacebookIcon';
import GoogleIcon from '../components/icons/GoogleIcon';
import TwitterIcon from '../components/icons/TwitterIcon';
import * as Yup from 'yup';
import { signup } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Form, Formik } from 'formik';
import Layout from '../components/Layout';

function SignupPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  if (user.authenticated) {
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
              <div className='flex justify-center mt-4 text-center'>
                <CircleButton icon={<FacebookIcon />} border='border-blue-dark' />
                <CircleButton icon={<GoogleIcon />} border='border-red-light' />
                <CircleButton icon={<TwitterIcon />} border='border-blue-light' />
              </div>

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
                  background='bg-red-hell hover:bg-red-600'
                  className='font-bold transition duration-300'
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
