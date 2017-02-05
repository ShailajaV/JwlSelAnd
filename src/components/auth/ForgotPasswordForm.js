import React, { Component } from 'react';
import { Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
//import { forgotPassword } from '../../actions';
import { Card, CardSection, Button, BackgroundImage } from '../common';
import { emailChanged } from '../../actions';

import {
  EMAIL_MSG,
  SEND,
  PLACEHOLDER_EMAIL
} from '../../actions/constants';


class ForgotPasswordForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }


  onButtonPress() {
    const { email } = this.props;
    this.props.forgotPassword({ email });
  }

  renderButton() {
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        {SEND}
      </Button>
    );
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
  <TextInput style={styles.inputStyle} placeholder={PLACEHOLDER_EMAIL} value={this.props.email} />
  </CardSection>
  <CardSection>
  {this.renderButton()}
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
  { emailChanged
  })(ForgotPasswordForm);
