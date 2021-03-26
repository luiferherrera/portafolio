import firebase from 'firebase'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBTVNz7pffE6CUqKIsDr-ssqeNfepgxkqQ",
    authDomain: "react-login-7ff2a.firebaseapp.com",
    projectId: "react-login-7ff2a",
    storageBucket: "react-login-7ff2a.appspot.com",
    messagingSenderId: "1012738453535",
    appId: "1:1012738453535:web:ff21ab8c8b7cce3e25652a"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.firestore(firebaseApp);


export default firebaseApp;