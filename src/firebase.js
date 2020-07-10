import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDDo4r_4jVbK04gu_4Z9T6ppGfyNYYTTRk",
    authDomain: "complex-b7b6a.firebaseapp.com",
    databaseURL: "https://complex-b7b6a.firebaseio.com",
    projectId: "complex-b7b6a",
    storageBucket: "complex-b7b6a.appspot.com",
    messagingSenderId: "671569198034",
    appId: "1:671569198034:web:cd09d4fc488f2d2181260b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

// const facebookProvider = new firebase.auth.

export { firebase, db, auth, storage }