import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactNative from 'react-native';
import { Title, Screen } from '@shoutem/ui';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Messages from './Messages';
import Input from './InputChat';
import { sendMessage, fetchMessages } from '../../actions';

const mapStateToProps = (state) => {
    const { height } = state.chatForm.meta;
    const { user } = state.auth;
  let message = null;
    _.map(state.chatForm.messages, (val) => {
        message = { ...val };
      return { message, height, user };
    });
    return { height, user, message };
};

class ChatUI extends Component {

  constructor(props) {
    super(props);
    this.scrollToInput = this.scrollToInput.bind(this);
  }
    state = {
        scrollViewHeight: 0,
        inputHeight: 0
    }

    componentWillMount() {
      console.log('fetchMessages');
      this.props.fetchMessages();
    }

    componentDidMount() {
        this.scrollToBottom(false);
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    onScrollViewLayout = (event) => {
        const layout = event.nativeEvent.layout;

        this.setState({
            scrollViewHeight: layout.height
        });
    }

    onInputLayout = (event) => {
        const layout = event.nativeEvent.layout;

        this.setState({
            inputHeight: layout.height
        });
    }

    scrollToBottom(animate = true) {
        const { scrollViewHeight, inputHeight } = this.state;
        const { height } = this.props;

        const scrollTo = height - (scrollViewHeight + inputHeight);

        if (scrollTo > 0) {
           this.refs.scroll.scrollToPosition(0, scrollTo, animate);
        }
    }

    scrollToInput(reactRef) {
        this.refs.scroll.scrollToFocusedInput(ReactNative.findNodeHandle(reactRef));
    }


    sendMessage = (text) => {
      const { userUID } = this.props.product;
      let messageId;
      console.log('this.props.message ', this.props.message);
      if (this.props.message !== null && this.props.message !== 'undefined') {
        const { id } = this.props.message;
        messageId = id;
      }
      console.log('messageId is ', messageId);
      return sendMessage(text, this.props.user, userUID, messageId);
    }

    render() {
        return (
            <Screen style={{ backgroundColor: '#1abc9c' }}>
                <Title styleName="h-center" style={{ paddingTop: 20 }}>
                    Global Chatroom
                </Title>
                <KeyboardAwareScrollView
                ref="scroll"
                onLayout={this.onScrollViewLayout}
                >
                    <Messages />
                    <Input
                      onLayout={this.onInputLayout}
                           onFocus={this.scrollToInput}
                           submitAction={this.sendMessage}
                           ref="input"
                           placeholder="Say something cool ..."
                    />
                </KeyboardAwareScrollView>
            </Screen>
        );
    }
}

export default connect(mapStateToProps, { fetchMessages })(ChatUI);
