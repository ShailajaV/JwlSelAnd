import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';

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
{
  name: 'Logout',
  avatar_url: ' ',
  subtitle: ' '
},
];

class Menu extends Component {
  render() {
    return (
      <List containerStyle={{ marginBottom: 20 }}>
        {
          list.map((l, i) => (
            <ListItem
              roundAvatar
              onPress={() => this.props.onItemSelected(l.name)}
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
