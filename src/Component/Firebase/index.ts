import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBWgn4lDPXEax2HAm-D8h_h6dVe-dy9A8Y",
  authDomain: "react-todo-app-9f797.firebaseapp.com",
  projectId: "react-todo-app-9f797",
  storageBucket: "react-todo-app-9f797.appspot.com",
  messagingSenderId: "352314120374",
  appId: "1:352314120374:web:49640d96607780b1faee17",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
