/* List of all chat users */
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection } from '../common';
import { UNDEFINED, SPACE } from '../../actions/constants';
import styles from '../common/CommonCSS';

class ChatUsersListItem extends Component {
  onRowPress() {
    const { isBuyer } = this.props.user;
    if (isBuyer) Actions.chat({ product: this.props.chatUser });
    else Actions.sellerChat({ product: this.props.chatUser });
  }

  render() {
    const { receiverName, receiverImg } = this.props.chatUser;
    let srcImg = SPACE;
    if (typeof receiverImg === UNDEFINED || receiverImg === SPACE ||
                receiverImg === null) {
      srcImg = require('../common/images/empty.png');
    } else {
      srcImg = { uri: receiverImg };
    }
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection style={{ borderBottomWidth: 1, borderColor: '#ddd' }}>
            <Image
            style={styles.chatImageStyle}
            source={srcImg}
            resizeMode={Image.resizeMode.strech}
            />
            <Text style={styles.titleStyle}>
              {receiverName}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state) => {
  let user = null;
  _.map(state.users, (value) => {
      user = { ...value };
      return { user };
    });
  return { user };
};

export default connect(mapStateToProps)(ChatUsersListItem);
