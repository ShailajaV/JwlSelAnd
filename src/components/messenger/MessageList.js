import React from 'react';
import { Image } from 'react-native';
import {
    ListView, Text, Row,
    View, Subtitle, Caption
} from '@shoutem/ui';
import moment from 'moment';
import { UNDEFINED, SPACE } from '../../actions/constants';
import styles from '../common/CommonCSS';

const Message = ({ msg }) => {
  let srcImg = SPACE;
  if (typeof msg.authorImg === UNDEFINED || msg.authorImg === SPACE ||
              msg.authorImg === null) {
    srcImg = require('../common/images/empty.png');
  } else {
    srcImg = { uri: msg.authorImg };
  }
  return (
    <Row>
        <Image
        style={styles.chatImageStyle}
        source={srcImg}
        resizeMode={Image.resizeMode.strech}
        />
        <View styleName="vertical">
            <View styleName="horizontal space-between">
                <Subtitle>{msg.author}</Subtitle>
                <Caption>{moment(msg.time).from(Date.now())}</Caption>
            </View>
            <Text styleName="multiline">{msg.message}</Text>
        </View>
    </Row>
  );
};

const MessageList = ({ chats, onLayout }) => (
    <ListView
      data={chats}
      autoHideHeader
      renderRow={msg => <Message msg={msg} />}
      onLayout={onLayout}
    />
);

export default MessageList;
