/* User Pre login form */
import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { signIn, signUp } from '../../actions';
import { Card, CardSection, Button, BackgroundImage } from '../common';
import { SIGN_IN, SIGN_UP } from '../../actions/constants';
import SideMenuImpl from '../menu/SideMenuImpl';

class PreLoginForm extends Component {
  constructor(props) {
  super(props);
  this.onChildClicked = this.onChildClicked.bind(this);
  this.handleToggle = this.handleToggle.bind(this);
}
state = {
            isOpen: false
    }


  onLogInButton() {
    this.props.signIn();
  }

  onSignUpButton() {
    this.props.signUp();
  }

  onChildClicked() {
    console.log('this.state.isOpenparent ', this.state.isOpen);
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  handleToggle() {
    console.log('this.state.isOpenparent ', this.state.isOpen);
        const nextState = !this.state.isOpen;
        this.setState({ isOpen: nextState });
        this.refs.child.toggle();
    }

  render() {
    return (
      <BackgroundImage>
      <CardSection style={{ backgroundColor: '#1abc9c' }}>
        <View
        style={{ flexDirection: 'row',
        justifyContent: 'flex-end',
         alignItems: 'flex-end',
         backgroundColor: '#1abc9c' }}
        >
          <Image
            source={require('../common/images/logo.png')}
            style={styles.backgroundStyle}
            resizeMode={Image.resizeMode.sretch}
          />
        <Card style={styles.containerStyle}>
          <CardSection>
            <Button onPress={this.onLogInButton.bind(this)}>
              {SIGN_IN}
            </Button>
            <Button onPress={this.onSignUpButton.bind(this)}>
              {SIGN_UP}
            </Button>
          </CardSection>
        </Card>
        </BackgroundImage>
    );
  }
}
const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0
  },
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8,
  },
  content: {
    padding: '16px',
  }
};
export default connect(null, { signIn, signUp })(PreLoginForm);
