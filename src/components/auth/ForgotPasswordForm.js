import React, { Component } from 'react';
import { Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from '../common';
import { userDetailsChanged, passwordReset } from '../../actions';
import { EMAIL_MSG, SEND, PLACEHOLDER_EMAIL } from '../../actions/constants';
import styles from '../common/CommonCSS';

class ForgotPasswordForm extends Component {

  onButtonPress() {
    const { email } = this.props;
    this.props.passwordReset({ email });
  }

  render() {
    return (
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
            placeholderTextColor='#fff'
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
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email } = auth;
  return { email };
};

export default connect(mapStateToProps,
  { userDetailsChanged, passwordReset
  })(ForgotPasswordForm);
