import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { View, Spinner } from '@shoutem/ui';

import MessageList from './MessageList';
import { updateMessagesHeight } from '../../actions';

const mapStateToProps = (state) => ({
    messages: state.chatForm.messages,
    isFetching: state.chatForm.meta.isFetching
});

const Messages = connect(mapStateToProps)(({ messages, isFetching, dispatch }) => {
    if (isFetching) {
        return (
            <View style={{ paddingTop: 50, paddingBottom: 50 }} >
              <Spinner />
            </View>
        );
    }
    console.log('messages ', messages);
    let chats = [];
    _.map(messages, (val) => {
      chats = _.map(val.chats, (value, uid) => {
        console.log('value ', value, 'uid ', uid);
          return { ...value, uid };
      });
    });
    console.log('chats ', chats);
    return (
    <MessageList
      chats={chats}
      style={{ minHeight: 100 }}
      onLayout={(event) => dispatch(updateMessagesHeight(event))}
    />);
});

export default Messages;
