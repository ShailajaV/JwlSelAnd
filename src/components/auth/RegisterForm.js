/* Registration form */
import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, BackgroundImage, Input, Button, Spinner } from '../common';
import {
  fullNameChanged,
  emailChanged,
  passwordChanged,
  addrStreetChanged,
  addrAptChanged,
  stateChanged,
  cityChanged,
  zipChanged,
  phoneNumChanged,
  createUserAccount } from '../../actions';
import {
  SPINNER_SIZE,
  LABEL_FULLNAME,
  PLACEHOLDER_FULLNAME,
  LABEL_EMAIL,
  PLACEHOLDER_EMAIL,
  LABEL_PASSWORD,
  PLACEHOLDER_PASSWORD,
  LABEL_ADDRESS_LINE1,
  PLACEHOLDER_STREET,
  LABEL_ADDRESS_LINE2,
  PLACEHOLDER_APT,
  LABEL_STATE,
  PLACEHOLDER_STATE,
  LABEL_CITY,
  PLACEHOLDER_CITY,
  LABEL_ZIP,
  PLACEHOLDER_ZIP,
  LABEL_PHONENUMBER,
  PLACEHOLDER_PHONENUMBER,
  SIGN_UP
} from '../../actions/constants';

class RegisterForm extends Component {

  onFullNameChange(text) {
    this.props.fullNameChanged(text);
  }

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

  onStateChange(text) {
    this.props.stateChanged(text);
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
    const { fullName, email, password, addrStreet,
       addrApt, state, city, zip, phoneNum } = this.props;
    this.props.createUserAccount({ fullName,
      email,
      password,
      addrStreet,
      addrApt,
      state,
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
              label={LABEL_FULLNAME}
              placeholder={PLACEHOLDER_FULLNAME}
              onChangeText={this.onFullNameChange.bind(this)}
              value={this.props.fullName}
            />
          </CardSection>

          <CardSection>
            <Input
              label={LABEL_EMAIL}
              placeholder={PLACEHOLDER_EMAIL}
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label={LABEL_PASSWORD}
              placeholder={PLACEHOLDER_PASSWORD}
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
          </CardSection>

          <CardSection>
            <Input
              label={LABEL_STATE}
              placeholder={PLACEHOLDER_STATE}
              onChangeText={this.onStateChange.bind(this)}
              value={this.props.state}
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
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

          <CardSection>
            {this.onSignUpButton()}
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
  }
};

const mapStateToProps = ({ auth }) => {
  const { fullName,
    email,
    password,
    error,
    loading,
    addrStreet,
    addrApt,
    state,
    city,
    zip,
    phoneNum
   } = auth;
  return { fullName,
    email,
    password,
    error,
    loading,
    addrStreet,
    addrApt,
    state,
    city,
    zip,
    phoneNum
  };
};

export default connect(mapStateToProps, {
  fullNameChanged,
  emailChanged,
  passwordChanged,
  addrStreetChanged,
  addrAptChanged,
  stateChanged,
  cityChanged,
  zipChanged,
  phoneNumChanged,
  createUserAccount
})(RegisterForm);
