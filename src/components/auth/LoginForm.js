/* login Form */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { userDetailsChanged, loginUser, forgotPassword, signUp, buyerLogin } from '../../actions';
import { Card, CardSection, Button, InputText, Spinner } from '../common';
import { PLACEHOLDER_EMAIL, PLACEHOLDER_PASSWORD, SIGN_IN,
  FORGOT_PASSWORD, EMAIL, PASSWORD, UNDEFINED, SIGN_UP, CONTINUE_GUEST
} from '../../actions/constants';
import { validateEmail, validatePassword } from '../common/Utils';
import styles from '../common/CommonCSS';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
       visible: false,
       errors: {}
    };
    this.validations = this.validations.bind(this);
  }

  componentWillMount() {
    setInterval(() => {
      if (!this.state.visible) {
        this.setState({
          visible: !this.state.visible
        });
      }
    }, 3000);
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    this.setState({ visible });
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

  onSignUpButton() {
    this.props.signUp();
  }

  onBuyerLogin() {
    this.props.buyerLogin();
  }

  validations(values) {
    const { email, password } = values;
    let errors = {};
    if (typeof email !== UNDEFINED) errors = validateEmail(email, this.state.errors);
    else if (values.uniqueName === EMAIL) errors = validateEmail(values.value, this.state.errors);
    /*if (typeof password !== UNDEFINED) errors = validatePassword(password, this.state.errors);
    else if (values.uniqueName === PASSWORD) {
      errors = validatePassword(values.value, this.state.errors);
    }*/
    this.setState({ errors });
    return errors;
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

  renderForgotPassword() {
    return (
      <TouchableOpacity onPress={this.onForgotPassword.bind(this)}>
        <Text style={styles.buttonTextStyle}>
          {FORGOT_PASSWORD}
        </Text>
      </TouchableOpacity>
    );
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner visible={this.state.visible} />;
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
          <Image
            source={require('../common/images/email.png')}
            style={styles.emailNpwdStyle}
            resizeMode={Image.resizeMode.sretch}
          />
          <InputText
            ref='email'
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
          justifyContent: 'flex-start',
           alignItems: 'center' }}
        >
          <Text style={styles.errorTextStyle}>
            {this.state.errors.email}
          </Text>
        </View>

        <CardSection>
          <Image
            source={require('../common/images/pwd.png')}
            style={styles.emailNpwdStyle}
            resizeMode={Image.resizeMode.sretch}
          />
          <InputText
            secureTextEntry
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
             justifyContent: 'flex-start',
             alignItems: 'center'
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
        </CardSection>

        <CardSection style={{ justifyContent: 'center' }}>
          {this.renderForgotPassword()}
        </CardSection>

        <CardSection style={{ justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.onSignUpButton.bind(this)}>
            <Text style={styles.buttonTextStyle}>
              {SIGN_UP}
            </Text >
          </TouchableOpacity>
        </CardSection>

        <CardSection style={{ justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.onBuyerLogin.bind(this)}>
            <Text style={styles.buttonTextStyle}>
              {CONTINUE_GUEST}
            </Text >
          </TouchableOpacity>
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
  { userDetailsChanged, loginUser, forgotPassword, signUp, buyerLogin
  })(LoginForm);
