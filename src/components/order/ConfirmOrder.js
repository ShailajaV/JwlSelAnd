/* Order confirmation */
import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../common/CommonCSS';
import { Card, CardSection } from '../common';

class ConfirmOrder extends Component {
  render() {
    return (
      <Card>
        <CardSection>
          <Icon
            name='check-circle-o'
            size={30}
            backgroundColor='#00fff'
            style={styles.imageStyle}
          />
          <Text>Thank you, your order has been placed. {'\n'}
          An email confirmation has been sent to you. {'\n'}
          Order Number: {this.props.orderId}</Text>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state.order ', state.order);
  const { orderId, error } = state.order;
  return { orderId, error };
};

export default connect(mapStateToProps)(ConfirmOrder);
