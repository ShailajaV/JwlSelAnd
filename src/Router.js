/* All the different routes/scenes the user can navigate */
import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import PreLoginForm from './components/auth/PreLoginForm';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import SellerProfile from './components/seller/SellerProfile';
import ProductForm from './components/product/ProductForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import {
  KEY_AUTH, HEADER_SIGN_IN, HEADER_LOG_IN, HEADER_SIGN_UP,
  KEY_SIGN_IN, KEY_SIGN_UP, KEY_LOGIN, KEY_FORGOT_PASSWORD, HEADER_FORGOT_PASS,
  KEY_SELLER, HEADER_ACT_SETTINGS, KEY_SELLER_PROFILE, KEY_PRODUCT, KEY_PRODUCT_DETAILS,
  HEADER_PRODUCT_DETAILS
} from './actions/constants';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 50 }}>
      <Scene key={KEY_AUTH}>
        <Scene key={KEY_SIGN_IN} component={PreLoginForm} title={HEADER_SIGN_IN} initial />
        <Scene key={KEY_LOGIN} component={LoginForm} title={HEADER_LOG_IN} />
        <Scene
          key={KEY_FORGOT_PASSWORD}
          component={ForgotPasswordForm} title={HEADER_FORGOT_PASS}
        />
        <Scene key={KEY_SIGN_UP} component={RegisterForm} title={HEADER_SIGN_UP} />
      </Scene>

      <Scene key={KEY_SELLER}>
        <Scene
          key={KEY_SELLER_PROFILE}
          component={SellerProfile}
          title={HEADER_ACT_SETTINGS}
        />
      </Scene>

        <Scene key={KEY_PRODUCT}>
          <Scene
            key={KEY_PRODUCT_DETAILS}
            component={ProductForm}
            title={HEADER_PRODUCT_DETAILS} initial
          />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
