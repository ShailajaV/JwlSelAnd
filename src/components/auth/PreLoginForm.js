/* User Pre login form */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signUp } from '../../actions';
import { Card, CardSection, Button } from '../common';
import { SIGN_IN, SIGN_UP } from '../../actions/constants';

class PreLoginForm extends Component {

  render() {
    return (
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
  },
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8,
  },
  content: {
    padding: '16px',
  }
};
export default connect(null, { signIn, signUp })(PreLoginForm);
