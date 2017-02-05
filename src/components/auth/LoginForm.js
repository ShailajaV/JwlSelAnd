/* login Form */
import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { userDetailsChanged, loginUser } from '../../actions';
import { Card, CardSection, Input, Button, Spinner, BackgroundImage } from '../common';
import {
  LABEL_EMAIL,
  PLACEHOLDER_EMAIL,
  LABEL_PASSWORD,
  PLACEHOLDER_PASSWORD,
  SIGN_IN,
  SPINNER_SIZE
} from '../../actions/constants';

class LoginForm extends Component {

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
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
      <BackgroundImage>
        <Card>
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
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>

          <CardSection>
            {this.renderButton()}
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
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps,
  { userDetailsChanged, loginUser
  })(LoginForm);
