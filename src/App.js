import React, { Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { isUserLoggedIn } from './actions/userActions';
import Spinner from './components/Spinner/Spinner';
import AdminRoute from './HOC/AdminRoute';
import UserRoute from './HOC/UserRoute';
const HistoryDetailPage = lazy(() => import('./pages/HistoryDetailPage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const CategoryListPage = lazy(() => import('./pages/CategoryListPage'));
const AddProductPage = lazy(() => import('./pages/AddProductPage'));
const UpdateProfilePage = lazy(() => import('./pages/UpdateProfilePage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const EditCategoryPage = lazy(() => import('./pages/EditCategoryPage'));
const EditProductPage = lazy(() => import('./pages/EditProductPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const OrderPage = lazy(() => import('./pages/OrderPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const PostNewPasswordPage = lazy(() => import('./pages/PostNewPasswordPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const SigninPage = lazy(() => import('./pages/SigninPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const UserPage = lazy(() => import('./pages/UserPage'));
const WishlistPage = lazy(() => import('./pages/WishListPage'));
const AddResiPage = lazy(() => import('./pages/AddResiPage'));

function App() {
  const dispatch = useDispatch();

  dispatch(isUserLoggedIn());

  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <AdminRoute path='/admin/tambah-produk' component={AddProductPage} />
        <AdminRoute path='/admin/daftar-kategori' component={CategoryListPage} />
        <AdminRoute path='/admin/edit-kategori/:id' component={EditCategoryPage} />
        <AdminRoute path='/admin/edit-produk/:id' component={EditProductPage} />
        <UserRoute path='/admin/tambah-resi/:id' component={AddResiPage} />
        <AdminRoute path='/admin' component={AdminPage} />
        <UserRoute path='/keranjang' component={CartPage} />
        <UserRoute path='/pembayaran' component={PaymentPage} />
        <UserRoute path='/favorit' component={WishlistPage} />
        <UserRoute path='/order' component={OrderPage} />
        <UserRoute path='/riwayat-pembelian/:id' component={HistoryDetailPage} />
        <UserRoute path='/riwayat-pembelian' component={HistoryPage} />
        <UserRoute path='/profil/update' component={UpdateProfilePage} />
        <UserRoute path='/profil' component={UserPage} />
        <Route path='/password-baru/:resetToken' component={PostNewPasswordPage} />
        <Route path='/lupa-password' component={ResetPasswordPage} />
        <Route path='/masuk' component={SigninPage} />
        <Route path='/daftar' component={SignupPage} />
        <Route path='/produk/:id' component={ProductDetailPage} />
        <Route path='/produk' component={ProductsPage} />
        <Route path='/' component={HomePage} />
      </Switch>
    </Suspense>
  );
}

export default App;
