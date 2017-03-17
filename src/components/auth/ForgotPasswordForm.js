import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, InputText } from '../common';
import { userDetailsChanged, passwordReset } from '../../actions';
import { EMAIL_MSG, SEND, PLACEHOLDER_EMAIL, EMAIL, UNDEFINED } from '../../actions/constants';
import styles from '../common/CommonCSS';
import { validateEmail } from '../common/Utils';

class ForgotPasswordForm extends Component {
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
      const { email } = this.props;
      this.props.passwordReset({ email });
    }
  }

  validations(values) {
    const { email } = values;
    let errors = {};
    if (typeof email !== UNDEFINED) errors = validateEmail(email, this.state.errors);
    else if (values.uniqueName === EMAIL) errors = validateEmail(values.value, this.state.errors);
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

  render() {
    return (
      <Card>
        <CardSection>
          <Text style={styles.textStyle}>
            {EMAIL_MSG}
          </Text>
        </CardSection>
        <CardSection>
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

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

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
  const { email, error } = auth;
  return { email, error };
};

export default connect(mapStateToProps,
  { userDetailsChanged, passwordReset
  })(ForgotPasswordForm);
