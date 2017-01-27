/* All the different routes/scenes the user can navigate */
import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import PreLoginForm from './components/auth/PreLoginForm';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import SellerProfileForm from './components/seller/SellerProfileForm';
import {
  KEY_AUTH, HEADER_SIGN_IN, HEADER_LOG_IN, HEADER_SIGN_UP,
  KEY_SIGN_IN, KEY_SIGN_UP, KEY_LOGIN, KEY_MAIN, HEADER_ACT_SETTINGS,
  KEY_SELLER_PROFILE
} from './actions/constants';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 50 }}>
      <Scene key={KEY_AUTH}>
        <Scene key={KEY_SIGN_IN} component={PreLoginForm} title={HEADER_SIGN_IN} initial />
        <Scene key={KEY_LOGIN} component={LoginForm} title={HEADER_LOG_IN} />
        <Scene key={KEY_SIGN_UP} component={RegisterForm} title={HEADER_SIGN_UP} />
      </Scene>
      <Scene key={KEY_MAIN}>
        <Scene
          key={KEY_SELLER_PROFILE}
          component={SellerProfileForm}
          title={HEADER_ACT_SETTINGS} initial
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
