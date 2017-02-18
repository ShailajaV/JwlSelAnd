import React, { Component } from 'react';
import { Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, BackgroundImage } from '../common';
import { userDetailsChanged, passwordReset } from '../../actions';

import {
  EMAIL_MSG,
  SEND,
  PLACEHOLDER_EMAIL
} from '../../actions/constants';


class ForgotPasswordForm extends Component {

  onButtonPress() {
    const { email } = this.props;
    this.props.passwordReset({ email });
  }

  render() {
    return (
      <BackgroundImage>
        <Card>
          <CardSection>
            <Text style={styles.textStyle}>
              {EMAIL_MSG}
            </Text>
          </CardSection>
          <CardSection>
            <TextInput
              style={styles.inputStyle}
              placeholder={PLACEHOLDER_EMAIL}
              value={this.props.email}
              onChangeText={value =>
                this.props.userDetailsChanged({ prop: 'email', value })}
            />
          </CardSection>
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
              {SEND}
            </Button>
          </CardSection>
        </Card>
      </BackgroundImage>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'black',
    fontFamily: 'Cochin'
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
    backgroundColor: '#fff'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email } = auth;
  return { email };
};

export default connect(mapStateToProps,
  { userDetailsChanged, passwordReset
  })(ForgotPasswordForm);
