/* login Form */
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { userDetailsChanged, loginUser, forgotPassword } from '../../actions';
import { Card, CardSection, Button, Input, Spinner } from '../common';
import { LABEL_EMAIL, PLACEHOLDER_EMAIL, LABEL_PASSWORD, PLACEHOLDER_PASSWORD, SIGN_IN,
  SPINNER_SIZE, FORGOT_PASSWORD, EMAIL, PASSWORD, UNDEFINED
} from '../../actions/constants';
import { validateEmail, validatePassword } from '../common/Utils';
import styles from '../common/CommonCSS';

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

  handleChange(fieldName, fieldValue) {
    if (typeof this.state.errors[fieldName] !== UNDEFINED) {
      const errors = Object.assign({}, this.state.errors);
      delete errors[fieldName];
      this.setState({
        [fieldName]: fieldValue,
        errors });
    } else {
      this.setState({ [fieldName]: fieldValue });
    }
  }

  validations(values) {
    const { email, password } = values;
    let errors = {};
    if (typeof email !== UNDEFINED) errors = validateEmail(email, this.state.errors);
    else if (values.uniqueName === EMAIL) errors = validateEmail(values.value, this.state.errors);
    if (typeof password !== UNDEFINED) errors = validatePassword(password, this.state.errors);
    else if (values.uniqueName === PASSWORD) {
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
      <Card>
        <CardSection style={styles.cardSeccontainerStyle}>
          <Image
            source={require('../common/images/logo.png')}
            style={styles.upload}
            resizeMode={Image.resizeMode.sretch}
          />
          </CardSection>
          <CardSection>
              <Input
                ref='email'
                label={LABEL_EMAIL}
                placeholder={PLACEHOLDER_EMAIL}
                value={this.props.email}
                uniqueName={EMAIL}
                validate={this.validations}
                onChange={this.handleChange.bind(this)}
                onChangeText={value =>
                  this.props.userDetailsChanged({ prop: 'email', value })}
              />
          </CardSection>
          <View
            style={{ flexDirection: 'row',
            justifyContent: 'flex-end',
             alignItems: 'flex-end' }}
          >
            <Text style={styles.errorTextStyle}>
              {this.state.errors.email}
            </Text>
          </View>

          <CardSection>
            <Input
              secureTextEntry
              label={LABEL_PASSWORD}
              placeholder={PLACEHOLDER_PASSWORD}
              value={this.props.password}
              uniqueName={PASSWORD}
              validate={this.validations}
              onChange={this.handleChange.bind(this)}
              onChangeText={value =>
                this.props.userDetailsChanged({ prop: 'password', value })}
            />
          </CardSection>
          <View
            style={{ flexDirection: 'row',
             justifyContent: 'flex-end',
             alignItems: 'flex-end'
           }}
          >
            <Text style={styles.errorTextStyle}>
              {this.state.errors.password}
            </Text>
          </View>

            <Text style={styles.errorTextStyle}>
              {this.props.error}
            </Text>

          <CardSection>
            {this.renderButton()}
            {this.renderForgotPassword()}
         </CardSection>
        </Card>

    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps,
  { userDetailsChanged, loginUser, forgotPassword
  })(LoginForm);
