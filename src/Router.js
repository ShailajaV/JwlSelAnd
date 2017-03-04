/* All the different routes/scenes the user can navigate */
import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import PreLoginForm from './components/auth/PreLoginForm';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import SellerProfile from './components/seller/SellerProfile';
import ProductCreate from './components/product/ProductCreate';
import ProductList from './components/product/ProductList';
import ProductEdit from './components/product/ProductEdit';
import {
  KEY_AUTH, KEY_SIGN_IN, KEY_SIGN_UP, KEY_LOGIN, KEY_FORGOT_PASSWORD,
  KEY_SELLER, KEY_SELLER_PROFILE, KEY_PRODUCT_DETAILS, KEY_PRODUCT_LIST,
  KEY_PRODUCT_EDIT
} from './actions/constants';

const RouterComponent = () => {
  return (
    <Router showNavigationBar={false}>
      <Scene key={KEY_AUTH}>
        <Scene key={KEY_SIGN_IN} component={PreLoginForm} hideNavBar initial />
        <Scene key={KEY_LOGIN} component={LoginForm} hideNavBar />
        <Scene key={KEY_SIGN_UP} component={RegisterForm} hideNavBar />
        <Scene
          key={KEY_FORGOT_PASSWORD}
          component={ForgotPasswordForm}
        />
      </Scene>

      <Scene key={KEY_SELLER}>
        <Scene key={KEY_SELLER_PROFILE} component={SellerProfile} hideNavBar />
        <Scene key={KEY_PRODUCT_DETAILS} component={ProductCreate} hideNavBar />
        <Scene key={KEY_PRODUCT_LIST} component={ProductList} hideNavBar />
        <Scene key={KEY_PRODUCT_EDIT} component={ProductEdit} hideNavBar />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
