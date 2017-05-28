/*import FCM, { FCMEvent, NotificationType, WillPresentNotificationResult,
RemoteNotificationResult } from 'react-native-fcm';
import { Platform } from 'react-native';*/
import { Actions } from 'react-native-router-flux';
import { firebaseDatabase, firebaseAuth } from '../FirebaseConfig';

export const addMessage = (msg) => {
  return {
    type: 'ADD_MESSAGE',
    ...msg
};
};

export const sendMessage = (text, id, messageId) => {
    return function (dispatch) {
let newMsgRef = '';
const { currentUser } = firebaseAuth;
// get the user details
firebaseDatabase.ref(`/users/${currentUser.uid}`)
.on('value', senSnapshot => {
  setTimeout(() => {
    const senderName = senSnapshot.val().fullName;
    const senderImg = senSnapshot.val().profilePic;
    // get the receiver details
    firebaseDatabase.ref(`/users/${id}`)
    .on('value', recSnapshot => {
      setTimeout(() => {
        const receiverName = recSnapshot.val().fullName;
        const receiverImg = recSnapshot.val().profilePic;
        // User message
        const userMsg = {
          senderName,
          receiverName
        };
        // chat message
        const chatMsg = {
          author: senderName,
          authorImg: typeof senderImg === 'undefined' ? '' : senderImg,
          message: text,
          time: Date.now()
        };
        // newly created chat
        if (messageId === '' || typeof messageId === 'undefined') {
            newMsgRef = firebaseDatabase.ref('messages').push();
            userMsg.id = newMsgRef.key;
            newMsgRef.set(userMsg);
            firebaseDatabase.ref(`/messages/${newMsgRef.key}/chats`).push(chatMsg)
            .then(() => {
              firebaseDatabase.ref(`/conversations/${currentUser.uid}/${id}`)
              .push({ chatTableId: userMsg.id,
                receiverName,
                receiverImg: typeof receiverImg === 'undefined' ? '' : receiverImg });
              firebaseDatabase.ref(`/conversations/${id}/${currentUser.uid}`)
              .push({ chatTableId: userMsg.id,
                receiverName: senderName,
                receiverImg: typeof senderImg === 'undefined' ? '' : senderImg });
              startChatting(dispatch, id);
            });
          } else {
            // update existing chats
            firebaseDatabase.ref(`/messages/${messageId}/chats`).push(chatMsg)
            .then(() => {
              startChatting(dispatch, id);
            });
          }
      }, 0);
    });
      }, 0);
    });
  };
};

export const startFetchingMessages = () => ({
    type: 'START_FETCHING_MESSAGES'
});

export const receivedMessages = () => ({
    type: 'RECEIVED_MESSAGES',
    receivedAt: Date.now()
});

export const fetchMessages = (id) => {
    return function (dispatch) {
        dispatch(startFetchingMessages());
        const { currentUser } = firebaseAuth;
        if (currentUser === null) {
          dispatch(userNoExist());
          Actions.auth();
        } else {
          // get the chatTableId/messageTableI
          dispatch(userAuthorized());
          firebaseDatabase.ref(`/conversations/${currentUser.uid}/${id}`)
        .on('value', snapshot => {
          setTimeout(() => {
            if (snapshot.val() !== null) {
              let chatTableId = '';
              Object.values(snapshot.val()).map(chatTable => {
                chatTableId = chatTable.chatTableId;
                return chatTableId;
                });
              firebaseDatabase
                      .ref(`/messages/${chatTableId}`)
                      .orderByKey()
                      .limitToLast(20)
                      .on('value', (finalSnapshot) => {
                          // gets around Redux panicking about actions in reducers
                          setTimeout(() => {
                              const messages = finalSnapshot.val() || [];
                                dispatch(receiveMessages(messages));
                          }, 0);
                      });
                    } else dispatch(receivedMessages());
          }, 0);
        });
      }
    };
};

export const receiveMessages = (messages) => {
    return function (dispatch) {
      dispatch(addMessage(messages));
        dispatch(receivedMessages());
    };
};

export const updateMessagesHeight = (event) => {
    const layout = event.nativeEvent.layout;

    return {
        type: 'UPDATE_MESSAGES_HEIGHT',
        height: layout.height
    };
};

const startChatting = function (dispatch, id) {
    dispatch(userAuthorized());
    dispatch(fetchMessages(id));
    /*FCM.requestPermissions();
    FCM.getFCMToken()
       .then(token => {
           console.log('token is ', token);
       });
    FCM.subscribeToTopic('secret-chatroom');

    FCM.on(FCMEvent.Notification, async (notif) => {
        if (Platform.OS === 'ios') {
            switch (notif.notificationType) {
                case NotificationType.Remote:
                    notif.finish(RemoteNotificationResult.NewData);
                    break;
                case NotificationType.NotificationResponse:
                    notif.finish();
                    break;
                case NotificationType.WillPresent:
                    notif.finish(WillPresentNotificationResult.All);
                    break;
                default:
                    break;
              }
            }
    });

    FCM.on(FCMEvent.RefreshToken, token => {
        console.log(token);
    });*/
};

/* Fetch list of chat users
* @return : ChatUsersList
*/
export const chatsUsersList = () => {
  const { currentUser } = firebaseAuth;
  return (dispatch) => {
    if (currentUser === null) {
      dispatch(userNoExist());
      Actions.auth();
    } else {
      dispatch(userAuthorized());
      firebaseDatabase.ref(`/conversations/${currentUser.uid}/`)
      .on('value', snapshot => {
        setTimeout(() => {
          dispatch(receiveUserMessages(snapshot.val()));
        }, 0);
      });
    }
  };
};

export const receiveUserMessages = (chatUsers) => {
  return {
    type: 'RECEIVED_USER_MESSAGES',
    chatUsers
  };
};

export const userAuthorized = () => ({
    type: 'USER_AUTHORIZED'
});

export const userNoExist = () => ({
    type: 'USER_NO_EXIST'
});
