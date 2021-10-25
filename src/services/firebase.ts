import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBpzz3UuMmmyKPuk4NsDaCG74c6Guu-_-0",
    authDomain: "jamestip-dash-c7a77.firebaseapp.com",
    databaseURL: "https://jamestip-dash-c7a77-default-rtdb.firebaseio.com",
    projectId: "jamestip-dash-c7a77",
    storageBucket: "jamestip-dash-c7a77.appspot.com",
    messagingSenderId: "389442803198",
    appId: "1:389442803198:web:fc8673f2af09cb3e76dcaf"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }