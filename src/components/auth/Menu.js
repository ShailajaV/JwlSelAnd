import React from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const { Component } = React;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

class Menu extends Component {

  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired
  };

  goToScreen() {
    Actions.logIn();
  }

  goToRegister() {
    Actions.signUp();
  }

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <Text
          onPress={this.goToScreen.bind()}
          style={styles.item}
        >
          Login
        </Text>

        <Text
          onPress={this.goToRegister.bind()}
          style={styles.item}
        >
          Register
        </Text>
      </ScrollView>
    );
  }
}

export default Menu;
