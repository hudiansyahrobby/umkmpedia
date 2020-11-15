import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { isUserLoggedIn } from './actions/userActions';
import AdminRoute from './HOC/AdminRoute';
import UserRoute from './HOC/UserRoute';
import AddCategoryPage from './pages/AddCategoryPage';
import AddProductPage from './pages/AddProductPage';
import AddressPage from './pages/AddressPage';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import EditCategoryPage from './pages/EditCategoryPage';
import EditProductPage from './pages/EditProductPage';
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';
import PaymentPage from './pages/PaymentPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import UserPage from './pages/UserPage';
import WishlistPage from './pages/wishListPage';

function App() {
  const dispatch = useDispatch();
  dispatch(isUserLoggedIn());

  return (
    <Switch>
      <AdminRoute path='/admin/tambah-produk' component={AddProductPage} />
      <AdminRoute path='/admin/tambah-kategori' component={AddCategoryPage} />
      <AdminRoute path='/admin/edit-kategori/:id' component={EditCategoryPage} />
      <AdminRoute path='/admin/edit-produk/:id' component={EditProductPage} />
      <AdminRoute path='/admin' component={AdminPage} />
      <UserRoute path='/keranjang' component={CartPage} />
      <UserRoute path='/pembayaran' component={PaymentPage} />
      <UserRoute path='/favorit' component={WishlistPage} />
      <UserRoute path='/order' component={OrderPage} />
      <UserRoute path='/profil/update' component={AddressPage} />
      <UserRoute path='/profil' component={UserPage} />
      <Route path='/masuk' component={SigninPage} />
      <Route path='/daftar' component={SignupPage} />
      <Route path='/produk/:id' component={ProductDetailPage} />
      <Route path='/produk' component={ProductsPage} />
      <Route path='/' component={HomePage} />
    </Switch>
  );
}

export default App;
