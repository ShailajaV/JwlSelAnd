/* Firebase configuration */
import firebase from 'firebase';

const config = {
apiKey: 'AIzaSyDFmxMQ6Fp55hh6RQiaUuIHsUYDlTKySZc',
authDomain: 'jewellery-ece6f.firebaseapp.com',
databaseURL: 'https://jewellery-ece6f.firebaseio.com',
storageBucket: 'jewellery-ece6f.appspot.com',
messagingSenderId: '601320078334'
};
const firebaseConfig = firebase.initializeApp(config);

module.exports.firebaseDatabase = firebaseConfig.database();
module.exports.firebaseAuth = firebaseConfig.auth();
module.exports.firebaseStorage = firebaseConfig.storage();
