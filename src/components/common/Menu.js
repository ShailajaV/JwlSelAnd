import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';


const window = Dimensions.get('window');
const styles = {
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
};

class Menu extends Component {


  /*static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };*/

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <Text onPress={() => this.props.onItemSelected('LoginForm')} style={styles.item} >
          Login
        </Text>

        <Text onPress={() => this.props.onItemSelected('AccountSettings')} style={styles.item} >
          Account Settings
        </Text>

        <Text onPress={() => this.props.onItemSelected('ProductCreate')} style={styles.item} >
          Upload Product
        </Text>

        <Text onPress={() => this.props.onItemSelected('ProductDetails')} style={styles.item} >
          Products List
        </Text>

        <Text onPress={() => this.props.onItemSelected('ForgotPassword')} style={styles.item} >
          Forgot Password
        </Text>
      </ScrollView>
    );
  }
}

export { Menu };
