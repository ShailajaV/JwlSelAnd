/* User Pre login form */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signUp } from '../../actions';
import { Card, CardSection, Button, BackgroundImage } from '../common';
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
      <BackgroundImage>
        <Card style={styles.containerStyle}>
          <CardSection>
            <Button onPress={this.onLogInButton.bind(this)}>
              {SIGN_IN}
            </Button>
            <Button onPress={this.onSignUpButton.bind(this)}>
              {SIGN_UP}
            </Button>
          </CardSection>
        </Card>
      </BackgroundImage>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0
  }
};

export default connect(null, { signIn, signUp })(PreLoginForm);
