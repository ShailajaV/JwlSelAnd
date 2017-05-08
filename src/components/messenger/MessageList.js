import React from 'react';
import {
    ListView, Text, Row,
    View, Subtitle, Caption
} from '@shoutem/ui';
import moment from 'moment';

const Message = ({ msg }) => {
  console.log('messages are ', { msg });
  return (
    <Row>
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

const MessageList = ({ messages, onLayout }) => (
    <ListView
      data={messages}
      autoHideHeader
      renderRow={msg => <Message msg={msg} />}
      onLayout={onLayout}
    />
);

export default MessageList;
