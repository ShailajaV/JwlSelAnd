import React, { Component } from 'react';
import { View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { firebaseAuth } from '../../FirebaseConfig';

const authList = [
{
  name: 'AllProducts',
  avatar_url: ' ',
  subtitle: ' '
},
{
  name: 'Chat',
  avatar_url: ' ',
  subtitle: ' '
},
{
  name: 'SelectPayment',
  avatar_url: ' ',
  subtitle: ' '
},
{
  name: 'AddCard',
  avatar_url: ' ',
  subtitle: ' '
},
{
  name: 'Logout',
  avatar_url: ' ',
  subtitle: ' '
},
];

const nonAuthList = [
{
  name: 'AllProducts',
  avatar_url: ' ',
  subtitle: ' '
},
{
  name: 'Chat',
  avatar_url: ' ',
  subtitle: ' '
}
];

class BuyerMenu extends Component {
  render() {
    let list = nonAuthList;
    const { currentUser } = firebaseAuth;
    if (currentUser !== null) list = authList;
    return (
      <View style={{ flex: 1, backgroundColor: '#ededed', paddingTop: 50 }}>
        <List containerStyle={{ marginBottom: 20 }}>
          {
            list.map((l, i) => (
              <ListItem
                onPress={() => this.props.onItemSelected(l.name)}
                key={i}
                title={l.name}
              />
            ))
          }
        </List>
      </View>
    );
  }
}

ListItem.defaultProps = {
  underlayColor: '#fff',
  chevronColor: 'gray',
  rightIcon: { name: 'chevron-right' }
};
BuyerMenu.defaultProps = {
 noOverlay: true
};

export default BuyerMenu;
