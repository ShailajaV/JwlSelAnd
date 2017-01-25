/* Registration form */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, BackgroundImage, Input, Button, Spinner } from '../common';
import {
  emailChanged,
  passwordChanged,
  addrStreetChanged,
  addrAptChanged,
  addrRestChanged,
  cityChanged,
  zipChanged,
  phoneNumChanged,
  createUserAccount } from '../../actions';
import {
  SPINNER_SIZE,
  LABEL_EMAIL,
  EMAIL_PLACEHOLDER,
  LABEL_PASSWORD,
  PASSWORD_PLACEHOLDER,
  LABEL_ADDRESS_LINE1,
  PLACEHOLDER_STREET,
  LABEL_ADDRESS_LINE2,
  PLACEHOLDER_APT,
  LABEL_CITY,
  PLACEHOLDER_CITY,
  LABEL_ZIP,
  PLACEHOLDER_ZIP,
  LABEL_PHONENUMBER,
  PLACEHOLDER_PHONENUMBER,
  SIGN_UP
} from '../../actions/constants';

class RegisterForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onAddrStreetChange(text) {
    this.props.addrStreetChanged(text);
  }

  onAddrAptChange(text) {
    this.props.addrAptChanged(text);
  }

  onAddrRestChange(text) {
    this.props.addrRestChanged(text);
  }

  onCityChange(text) {
    this.props.cityChanged(text);
  }

  onZipChange(text) {
    this.props.zipChanged(text);
  }

  onPhoneNumChange(text) {
    this.props.phoneNumChanged(text);
  }

  onSignUpButton() {
    if (this.props.loading) {
      return <Spinner size={SPINNER_SIZE} />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        {SIGN_UP}
      </Button>
    );
  }

  onButtonPress() {
    const { email, password, addrStreet, addrApt, addrRest, city, zip, phoneNum } = this.props;
    this.props.createUserAccount({ email,
      password,
      addrStreet,
      addrApt,
      addrRest,
      city,
      zip,
      phoneNum });
  }

  render() {
    return (
      <BackgroundImage>
        <Card>
          <CardSection>
            <Input
              label={LABEL_EMAIL}
              placeholder={EMAIL_PLACEHOLDER}
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label={LABEL_PASSWORD}
              placeholder={PASSWORD_PLACEHOLDER}
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </CardSection>

          <CardSection>
            <Input
              label={LABEL_ADDRESS_LINE1}
              placeholder={PLACEHOLDER_STREET}
              onChangeText={this.onAddrStreetChange.bind(this)}
              value={this.props.addrStreet}
            />
          </CardSection>

          <CardSection>
            <Input
              label={LABEL_ADDRESS_LINE2}
              placeholder={PLACEHOLDER_APT}
              onChangeText={this.onAddrAptChange.bind(this)}
              value={this.props.addrApt}
            />
            <Input
              onChangeText={this.onAddrRestChange.bind(this)}
              value={this.props.addrRest}
            />
          </CardSection>

          <CardSection>
            <Input
              label={LABEL_CITY}
              placeholder={PLACEHOLDER_CITY}
              onChangeText={this.onCityChange.bind(this)}
              value={this.props.city}
            />
            <Input
              label={LABEL_ZIP}
              placeholder={PLACEHOLDER_ZIP}
              onChangeText={this.onZipChange.bind(this)}
              value={this.props.zip}
            />
          </CardSection>

          <CardSection>
            <Input
              label={LABEL_PHONENUMBER}
              placeholder={PLACEHOLDER_PHONENUMBER}
              onChangeText={this.onPhoneNumChange.bind(this)}
              value={this.props.phoneNum}
            />
          </CardSection>

          <CardSection>
            {this.onSignUpButton()}
          </CardSection>
        </Card>
      </BackgroundImage>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email,
    password,
    error,
    loading,
    addrStreet,
    addrApt,
    addrRest,
    city,
    zip,
    phoneNum
   } = auth;
  return { email,
    password,
    error,
    loading,
    addrStreet,
    addrApt,
    addrRest,
    city,
    zip,
    phoneNum
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  addrStreetChanged,
  addrAptChanged,
  addrRestChanged,
  cityChanged,
  zipChanged,
  phoneNumChanged,
  createUserAccount
})(RegisterForm);
