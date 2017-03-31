/* All the different routes/scenes the user can navigate */
import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import SellerProfile from './components/seller/SellerProfile';
import ProductCreate from './components/product/ProductCreate';
import ProductList from './components/product/ProductList';
import ProductEdit from './components/product/ProductEdit';
import MainScreen from './MainScreen';
import {
  KEY_AUTH, KEY_SIGN_UP, KEY_LOGIN, KEY_FORGOT_PASSWORD,
  KEY_SELLER, KEY_SELLER_PROFILE, KEY_PRODUCT_DETAILS, KEY_PRODUCT_LIST,
  KEY_PRODUCT_EDIT, KEY_MENU, KEY_MENU_PROFILE
} from './actions/constants';

const RouterComponent = () => {
  return (
    <Router showNavigationBar={false} >
      <Scene key={KEY_AUTH} initial>
        <Scene
          key={KEY_LOGIN}
          sceneStyle={{ backgroundColor: '#1abc9c', }}
          component={LoginForm} hideNavBar initial
        />
        <Scene
          key={KEY_SIGN_UP}
          sceneStyle={{ backgroundColor: '#1abc9c', }}
          component={RegisterForm} hideNavBar
        />
        <Scene
          key={KEY_FORGOT_PASSWORD}
          sceneStyle={{ backgroundColor: '#1abc9c', }}
          component={ForgotPasswordForm}
        />
      </Scene>
      <Scene key={KEY_MENU}>
      <Scene
        key={KEY_MENU_PROFILE}
        sceneStyle={{ backgroundColor: '#1abc9c', }}
        component={MainScreen} hideNavBar
      />
       </Scene>


      <Scene key={KEY_SELLER}>
        <Scene
          key={KEY_SELLER_PROFILE}
          sceneStyle={{ backgroundColor: '#1abc9c', }}
          component={SellerProfile} hideNavBar
        />
        <Scene
          key={KEY_PRODUCT_DETAILS}
          sceneStyle={{ backgroundColor: '#1abc9c', }}
          component={ProductCreate} hideNavBar
        />
        <Scene
          key={KEY_PRODUCT_LIST}
          sceneStyle={{ backgroundColor: '#1abc9c', }}
          component={ProductList} hideNavBar
        />
        <Scene
          key={KEY_PRODUCT_EDIT}
          sceneStyle={{ backgroundColor: '#1abc9c', }}
          component={ProductEdit} hideNavBar
        />
      </Scene>
</Router>

  );
};

export default RouterComponent;
