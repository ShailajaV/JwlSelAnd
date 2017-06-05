/* This file fetches the chat users  */
import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { chatsUsersList } from '../../actions';
import ChatUsersListItem from './ChatUsersListItem';

class ChatUsersList extends Component {
  componentWillMount() {
    this.props.chatsUsersList();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ chatUsers }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(chatUsers);
  }

  renderRow(chatUser) {
    return <ChatUsersListItem chatUser={chatUser} />;
  }
  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        style={{ backgroundColor: '#fff' }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const chatUsers = [];
  _.map(state.chatForm.meta.chatUsers, (val, id) => {
    _.map(val, (value) => {
      chatUsers.push({ ...value, id });
      return { ...value, id };
    });
  });
  return { chatUsers };
};

export default connect(mapStateToProps, { chatsUsersList })(ChatUsersList);
