/* Registration form */
import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, BackgroundImage, Input, Button, Spinner } from '../common';
import {
  userDetailsChanged,
  createUserAccount } from '../../actions';
import {
  SPINNER_SIZE,
  LABEL_FULLNAME,
  PLACEHOLDER_FULLNAME,
  LABEL_EMAIL,
  PLACEHOLDER_EMAIL,
  LABEL_PASSWORD,
  PLACEHOLDER_PASSWORD,
  LABEL_COMPANY_NAME,
  PLACEHOLDER_COMPANY_NAME,
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
    const { fullName, email, password, companyName, addrStreet,
       addrApt, state, city, zip, phoneNum } = this.props;
    this.props.createUserAccount({ fullName,
      email,
      password,
      companyName,
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
              value={this.props.fullName}
              onChangeText={value =>
                this.props.userDetailsChanged({ prop: 'fullName', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              label={LABEL_EMAIL}
              placeholder={PLACEHOLDER_EMAIL}
              value={this.props.email}
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
              onChangeText={value =>
                this.props.userDetailsChanged({ prop: 'password', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              label={LABEL_COMPANY_NAME}
              placeholder={PLACEHOLDER_COMPANY_NAME}
              value={this.props.companyName}
              onChangeText={value =>
                this.props.userDetailsChanged({ prop: 'companyName', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              label={LABEL_ADDRESS_LINE1}
              placeholder={PLACEHOLDER_STREET}
              value={this.props.addrStreet}
              onChangeText={value =>
                this.props.userDetailsChanged({ prop: 'addrStreet', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              label={LABEL_ADDRESS_LINE2}
              placeholder={PLACEHOLDER_APT}
              value={this.props.addrApt}
              onChangeText={value =>
                this.props.userDetailsChanged({ prop: 'addrApt', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              label={LABEL_STATE}
              placeholder={PLACEHOLDER_STATE}
              value={this.props.state}
              onChangeText={value =>
                this.props.userDetailsChanged({ prop: 'state', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              label={LABEL_CITY}
              placeholder={PLACEHOLDER_CITY}
              value={this.props.city}
              onChangeText={value =>
                this.props.userDetailsChanged({ prop: 'city', value })}
            />
            <Input
              label={LABEL_ZIP}
              placeholder={PLACEHOLDER_ZIP}
              value={this.props.zip}
              onChangeText={value =>
                this.props.userDetailsChanged({ prop: 'zip', value })}
            />
          </CardSection>

          <CardSection>
            <Input
              label={LABEL_PHONENUMBER}
              placeholder={PLACEHOLDER_PHONENUMBER}
              value={this.props.phoneNum}
              onChangeText={value =>
                this.props.userDetailsChanged({ prop: 'phoneNum', value })}
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
    companyName,
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
    companyName,
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

export default connect(mapStateToProps, { userDetailsChanged, createUserAccount })(RegisterForm);
