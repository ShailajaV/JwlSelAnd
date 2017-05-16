const message = (state, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {
                id: action.id,
                senderName: action.senderName,
                receiverName: action.receiverName,
                chats: action.chats
            };
        default:
            return state;
    }
};

export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return [
              ...state,
              message(state, action)
            ];
        /*case 'SEND_MESSAGE':
            return [
                ...state,
                message(undefined, action)
            ];*/
        default:
            return state;
    }
};
