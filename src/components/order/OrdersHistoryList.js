/* List of orders */
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';
import moment from 'moment';
import { connect } from 'react-redux';
import { getOrdersDetails } from '../../actions';
import styles from '../common/CommonCSS';

class OrdersHistoryList extends Component {
  componentWillMount() {
    this.props.getOrdersDetails();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text style={{ fontWeight: '700', alignSelf: 'center' }}>Your orders</Text>
        <List containerStyle={{ marginBottom: 20, backgroundColor: '#fff' }}>
          {
            this.props.orders.map((l, i) => {
              const onOrderSelected = () => {
                Actions.orderHistoryForm({ order: l });
              };
              return (
              <ListItem
                onPress={onOrderSelected}
                key={i}
                title={
                  <View>
                    <Text>{l.id}{'\n'}</Text>
                    <Text style={styles.titleStyle}>
                      Ordered on {moment(new Date(l.orderDetails.createdAt))
                        .format('DD-MM-YYYY HH:mm')}
                    </Text>
                  </View>
                }
              />
            );
            })
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
const mapStateToProps = (state) => {
  const orders = _.map(state.order.orders, (val, id) => {
    return { ...val, id };
  });
  return { orders };
};
export default connect(mapStateToProps, { getOrdersDetails })(OrdersHistoryList);
