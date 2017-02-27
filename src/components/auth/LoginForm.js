/* login Form */
import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { userDetailsChanged, loginUser, forgotPassword } from '../../actions';
import { Card, CardSection, Button, Spinner, BackgroundImage } from '../common';
import { LABEL_EMAIL, PLACEHOLDER_EMAIL, LABEL_PASSWORD, PLACEHOLDER_PASSWORD, SIGN_IN,
  SPINNER_SIZE, FORGOT_PASSWORD
} from '../../actions/constants';
import { Input } from '../common/Input';
import { validateEmail, validatePassword } from '../common/Utils';

class LoginForm extends Component {
  constructor(props) {
   super(props);
   this.validations = this.validations.bind(this);
 }

 state = {
   errors: {}
 }

  onButtonPress() {
    const errors = this.validations(this.props);
    if (Object.keys(errors).length === 0) {
      const { email, password } = this.props;
      this.props.loginUser({ email, password });
    }
  }

  onForgotPassword() {
    this.setState({ errors: {} });
    Actions.forgotPassword();
  }

  handleChange(values) {
    if (typeof this.state.errors[values.uniqueName] !== 'undefined') {
      const errors = Object.assign({}, this.state.errors);
      delete errors[values.uniqueName];
      this.setState({
        [values.uniqueName]: values.value,
        errors });
    } else {
      this.setState({ [values.uniqueName]: values.value });
    }
  }

  validations(values) {
    const { email, password } = values;
    let errors = {};
    if (typeof email !== 'undefined') errors = validateEmail(email, this.state.errors);
    else if (values.label === 'Email') errors = validateEmail(values.value, this.state.errors);
    if (typeof password !== 'undefined') errors = validatePassword(password, this.state.errors);
    else if (values.label === 'Password') {
      errors = validatePassword(values.value, this.state.errors);
    }
    this.setState({ errors });
    return errors;
  }

  renderForgotPassword() {
    return (
      <Button onPress={this.onForgotPassword.bind(this)}>
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
              errorMessage={this.state.errors.email}
              uniqueName='email'
              validate={this.validations}
              onChange={this.handleChange.bind(this)}
              onChangeText={value =>
                this.props.userDetailsChanged({ prop: 'email', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label={LABEL_PASSWORD}
              placeholder={PLACEHOLDER_PASSWORD}
              value={this.props.password}
              errorMessage={this.state.errors.password}
              uniqueName='password'
              validate={this.validations}
              onChange={this.handleChange.bind(this)}
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
