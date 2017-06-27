/* login Form */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import { userDetailsChanged, loginUser, signUp, buyerLogin } from '../../actions';
import { CardSection, Button, InputText, Spinner } from '../common';
import { PLACEHOLDER_EMAIL, PLACEHOLDER_PASSWORD, SIGN_IN,
  FORGOT_PASSWORD, EMAIL, PASSWORD, UNDEFINED, SIGN_UP, CONTINUE_GUEST
} from '../../actions/constants';
import { validateEmail } from '../common/Utils';
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
    const { email } = values;
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

  loginWithFacebook() {

  }

  loginWithGoogle() {

  }

  renderForgotPassword() {
    return (
      <TouchableOpacity onPress={this.onForgotPassword.bind(this)}>
        <Text style={{ color: '#fff', fontSize: 11, fontWeight: '500' }}>
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
      <Image
        style={styles.loginFormMainBodyCardStyle}
        source={require('../common/images/background.jpg')}
      >
        <CardSection style={styles.loginFormLogoCardSectionStyle}>
          <Image
            source={require('../common/images/logo.png')}
            style={styles.upload}
            resizeMode={Image.resizeMode.sretch}
          />
        </CardSection>
        <CardSection style={styles.loginFormContentsCardSectionStyle}>
          <View
            style={{ alignItems: 'stretch',
            backgroundColor: '#fff',
            borderRadius: 4 }}
          >
            <CardSection
              style={{ alignItems: 'stretch' }}
            >
              <Icon
                name="md-mail"
                size={20}
                backgroundColor="#3b5998"
                style={styles.emailNpwdIconStyle}
              />
              <InputText
                ref='email'
                value={this.props.email}
                uniqueName={EMAIL}
                validate={this.validations}
                styleObj={styles.logInputStyle}
                onChange={this.handleChange.bind(this)}
                onChangeText={value =>
                  this.props.userDetailsChanged({ prop: 'email', value })}
                placeholder={PLACEHOLDER_EMAIL}
              />
            </CardSection>
            <View
              style={{ height: 1, backgroundColor: '#000', flexDirection: 'column', opacity: 0.8 }}
            />
            <CardSection
              style={{ alignItems: 'stretch' }}
            >
              <Icon
                name="md-key"
                size={20}
                backgroundColor="#3b5998"
                style={styles.emailNpwdIconStyle}
              />
              <InputText
                secureTextEntry
                value={this.props.password}
                uniqueName={PASSWORD}
                validate={this.validations}
                styleObj={styles.logInputStyle}
                onChange={this.handleChange.bind(this)}
                onChangeText={value =>
                  this.props.userDetailsChanged({ prop: 'password', value })}
                placeholder={PLACEHOLDER_PASSWORD}
              />
            </CardSection>
          </View>
          <CardSection style={{ justifyContent: 'center' }}>
                  {this.renderForgotPassword()}
          </CardSection>
          <CardSection
            style={{ marginLeft: 20,
              marginRight: 20,
              marginTop: 20 }}
          >
            {this.renderButton()}
          </CardSection>
          <CardSection style={{ marginLeft: 20, marginRight: 20 }}>
            <Button onPress={this.onBuyerLogin.bind(this)}>
              {CONTINUE_GUEST}
            </Button>
          </CardSection>
          <CardSection style={{ justifyContent: 'center', marginTop: 7 }}>
            <Text style={{ color: '#fff', fontSize: 11, fontWeight: '500', marginTop: 1 }}>
              {'Don\'t have and account? '}
            </Text >
            <TouchableOpacity onPress={this.onSignUpButton.bind(this)}>
              <Text style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}>
                {SIGN_UP}
              </Text >
            </TouchableOpacity>
          </CardSection>
        </CardSection>
      </Image>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps,
  { userDetailsChanged, loginUser, signUp, buyerLogin
  })(LoginForm);
