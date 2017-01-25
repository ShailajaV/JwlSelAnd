/* All the different routes/scenes the user can navigate */
import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import PreLoginForm from './components/auth/PreLoginForm';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import {
  KEY_AUTH,
  HEADER_SIGN_IN,
  HEADER_LOG_IN,
  HEADER_SIGN_UP,
  KEY_SIGN_IN,
  KEY_SIGN_UP,
  KEY_LOGIN,
  KEY_MAIN
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
        <Scene key={KEY_SIGN_IN} component={PreLoginForm} title={HEADER_SIGN_IN} initial />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
