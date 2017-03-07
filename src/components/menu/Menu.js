import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import {
  Dimensions
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

const list = [
{
  name: 'LoginForm',
  avatar_url: ' ',
  subtitle: ' '
},
{
  name: 'AccountSettings',
  avatar_url: ' ',
  subtitle: ' '
},
{
  name: 'ProductCreate',
  avatar_url: ' ',
  subtitle: ' '
},
{
  name: 'ProductDetails',
  avatar_url: ' ',
  subtitle: ' '
},
{
  name: 'ForgotPassword',
  avatar_url: ' ',
  subtitle: ' '
},

];

class Menu extends Component {


  /*static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };*/

  render() {
    return (
      <List containerStyle={{ marginBottom: 20 }}>
     {
       list.map((l, i) => (
          <ListItem
           roundAvatar
           onPress={() => this.props.onItemSelected(l["name"])}
           key={i}
           title={l.name}


          />
       ))
     }
     </List>
    );
  }
}

export default Menu;
