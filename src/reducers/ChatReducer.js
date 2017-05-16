import { combineReducers } from 'redux';
import messages from './MessagesReducer';
//import { CHAT_USERS_FETCH_SUCCESS, USER_NAME_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    isFetching: false,
    lastFetched: null,
    height: 0,
    chatUsers: [],
    authorized: false
};

const meta = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'START_FETCHING_MESSAGES':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'RECEIVED_MESSAGES':
            return Object.assign({}, state, {
                isFetching: false,
                lastFetched: action.receivedAt,
            });
        case 'UPDATE_MESSAGES_HEIGHT':
            return Object.assign({}, state, {
                height: action.height
            });
        case 'RECEIVED_USER_MESSAGES':
          return Object.assign({}, state, {
            chatUsers: action.chatUsers
          });
        case 'USER_AUTHORIZED':
            return Object.assign({}, state, {
                authorized: true
            });
        case 'USER_NO_EXIST':
          return Object.assign({}, state, {
              authorized: false
          });
        default:
            return state;
    }
};

const ChatReducer = combineReducers({
    messages,
    meta
});

export default ChatReducer;
