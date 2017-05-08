const message = (state, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return {
                id: action.id,
                senderId: action.senderId,
                receiverId: action.receiverId,
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
