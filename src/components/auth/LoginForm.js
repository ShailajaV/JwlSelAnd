/* login Form */
import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { userDetailsChanged, loginUser, forgotPassword } from '../../actions';
import { Card, CardSection, Input, Button, Spinner, BackgroundImage } from '../common';
import {
  LABEL_EMAIL,
  PLACEHOLDER_EMAIL,
  LABEL_PASSWORD,
  PLACEHOLDER_PASSWORD,
  SIGN_IN,
  SPINNER_SIZE,
  FORGOT_PASSWORD
} from '../../actions/constants';

class LoginForm extends Component {

  onForgotPassword(text) {
    this.props.forgotPassword(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }
  onPress() {
    const { email } = this.props;
    this.props.forgotPassword({ email });
  }
  renderForgotPassword() {
    return (
      <Button onPress={this.onPress.bind(this)}>
      {FORGOT_PASSWORD}
      </Button>
    );
  }


  renderButton() {
    if (this.props.loading) {
      return <Spinner size={SPINNER_SIZE} />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        {SIGN_IN}
      </Button>
    );
  }

  render() {
    return (
      <BackgroundImage>
        <Card>
          <CardSection>
            <Input
              label={LABEL_EMAIL}
              placeholder={PLACEHOLDER_EMAIL}
              value={this.props.email}
              onChangeText={value =>
                this.props.userDetailsChanged({ prop: 'email', value })}
              style={styles.labelStyle}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label={LABEL_PASSWORD}
              placeholder={PLACEHOLDER_PASSWORD}
              value={this.props.password}
              onChangeText={value =>
                this.props.userDetailsChanged({ prop: 'password', value })}
            />
          </CardSection>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

          <CardSection>
            {this.renderButton()}
            {this.renderForgotPassword()}
         </CardSection>
        </Card>
      </BackgroundImage>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  forgotPasswordStyle: {
    flex: 1,
    color: 'blue',
    fontSize: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: 'Cochin'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps,
  { userDetailsChanged, loginUser, forgotPassword
  })(LoginForm);
