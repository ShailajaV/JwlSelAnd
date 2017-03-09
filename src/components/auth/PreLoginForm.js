/* User Pre login form */
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { signIn, signUp } from '../../actions';
import { Card, CardSection, Button } from '../common';
import { SIGN_IN, SIGN_UP } from '../../actions/constants';
import styles from '../common/CommonCSS';

class PreLoginForm extends Component {
  onLogInButton() {
    this.props.signIn();
  }

  onSignUpButton() {
    this.props.signUp();
  }

  render() {
    return (
      <Card style={styles.loginContainerStyle}>
        <CardSection />
        <CardSection />
        <CardSection />
        <CardSection />
        <CardSection>
          <Image
            source={require('../common/images/logo.png')}
            style={styles.upload}
            resizeMode={Image.resizeMode.sretch}
          />
        </CardSection>
        <CardSection>
          <Button onPress={this.onLogInButton.bind(this)}>
            {SIGN_IN}
          </Button>
          <Button onPress={this.onSignUpButton.bind(this)}>
            {SIGN_UP}
          </Button>
        </CardSection>
      </Card>
    );
  }
}
export default connect(null, { signIn, signUp })(PreLoginForm);
