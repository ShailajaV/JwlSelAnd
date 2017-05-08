import { combineReducers } from 'redux';
import messages from './MessagesReducer';

const INITIAL_STATE = {
    isFetching: false,
    lastFetched: null,
    height: 0
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
                lastFetched: action.receivedAt
            });
        case 'UPDATE_MESSAGES_HEIGHT':
            return Object.assign({}, state, {
                height: action.height
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
