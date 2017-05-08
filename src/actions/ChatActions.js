import FCM, { FCMEvent, NotificationType, WillPresentNotificationResult, RemoteNotificationResult }
 from 'react-native-fcm';
import { Platform } from 'react-native';
//import firebase from 'firebase';
import { firebaseDatabase, firebaseAuth } from '../FirebaseConfig';

export const addMessage = (msg) => {
  console.log('msgin addmessage ', msg, '...msg is ', ...msg);
  return {
    type: 'ADD_MESSAGE',
    ...msg
};
};

export const sendMessage = (text, user, userUID, chatId, messageId) => {
    return function (dispatch) {
        const msg = {
          senderId: user.displayName,
          receiverId: userUID
        };
console.log('msg ', msg);
let newMsgRef = '';
const chatMsg = {
  author: user.displayName,
  message: text,
  time: Date.now()
};
      if (messageId === '' || typeof messageId === 'undefined') {
        newMsgRef = firebaseDatabase.ref('messages').push();
        console.log('newMsgRef.key ', newMsgRef.key);
        msg.id = newMsgRef.key;
        newMsgRef.set(msg);
        newMsgRef = firebaseDatabase.ref(`/messages/${newMsgRef.key}/chats`).push(chatMsg)
        .then(() => {
          startChatting(dispatch);
        });
      } else {
        newMsgRef = firebaseDatabase.ref(`/messages/${messageId}/chats`).push(chatMsg)
        .then(() => {
          startChatting(dispatch);
        });
      }
      /*const listOfUIDs = {
          chatUIDs: {
            chatUId: newMsgRef.key
          }
        };
        firebaseDatabase.ref('conversations').push(listOfUIDs);*/
        //dispatch(addMessage(addMsg));
        console.log('newMsgRef is ', newMsgRef);
    };
};

export const startFetchingMessages = () => ({
    type: 'START_FETCHING_MESSAGES'
});

export const receivedMessages = () => ({
    type: 'RECEIVED_MESSAGES',
    receivedAt: Date.now()
});

export const fetchMessages = () => {
    return function (dispatch) {
        dispatch(startFetchingMessages());

        firebaseDatabase
                .ref('messages')
                .orderByKey()
                .limitToLast(20)
                .on('value', (snapshot) => {
                    // gets around Redux panicking about actions in reducers
                    setTimeout(() => {
                        const messages = snapshot.val() || [];
                        console.log('messagesin fetch ', messages);
                        dispatch(receiveMessages(messages));
                    }, 0);
                });
    };
};

export const receiveMessages = (messages) => {
  console.log('receiveMessages ', messages);
    return function (dispatch) {
        Object.values(messages).forEach(msg => dispatch(addMessage(msg)));

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
//
// User actions
//

export const setUserName = (name) => ({
    type: 'SET_USER_NAME',
    name
});

export const setUserAvatar = (avatar) => ({
    type: 'SET_USER_AVATAR',
    avatar: avatar && avatar.length > 0 ? avatar : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png'
});

/*export const checkUserExists = () => {
    return function (dispatch) {
        dispatch(startAuthorizing());
const { currentUser } = firebaseAuth;
        firebaseAuth
                .signInAnonymously()
                .then(() => firebaseDatabase
                                    .ref(`users/${currentUser}`)
                                    .once('value', (snapshot) => {
                                        const val = snapshot.val();

                                        if (val === null) {
                                            dispatch(userNoExist());
                                        } else {
                                            dispatch(setUserName(val.name));
                                            dispatch(setUserAvatar(val.avatar));
                                            startChatting(dispatch);
                                        }
                                    }))
                .catch(err => console.log(err));
    };
};*/

const startChatting = function (dispatch) {
    dispatch(userAuthorized());
    dispatch(fetchMessages());
    FCM.requestPermissions();
    FCM.getFCMToken()
       .then(token => {
           console.log('token is ', token);
       });
    FCM.subscribeToTopic('notifications_TestD');

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
    });
};

export const startAuthorizing = () => ({
    type: 'USER_START_AUTHORIZING'
});

export const userAuthorized = () => ({
    type: 'USER_AUTHORIZED'
});

export const userNoExist = () => ({
    type: 'USER_NO_EXIST'
});
