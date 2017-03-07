/* User Pre login form */
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { signIn, signUp } from '../../actions';
import { Card, CardSection, Button } from '../common';
import { SIGN_IN, SIGN_UP } from '../../actions/constants';

class PreLoginForm extends Component {
  onLogInButton() {
      this.props.signIn();
    }

  onSignUpButton() {
    this.props.signUp();
  }

  render() {
    return (

      <Card style={styles.containerStyle}>
      <Card />
      <Card />
      <Card />
      <Card />
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
const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    backgroundColor: '#1abc9c'
  },
  cardUpload: {
    padding: 150
  },
  upload: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
};
export default connect(null, { signIn, signUp })(PreLoginForm);
