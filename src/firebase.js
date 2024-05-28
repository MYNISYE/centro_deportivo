import app from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC2X5auIyjF8N31gz_djJc7jvguNldWUS4",
  authDomain: "centro-deporti.firebaseapp.com",
  projectId: "centro-deporti",
  storageBucket: "centro-deporti.appspot.com",
  messagingSenderId: "954074298761",
  appId: "1:954074298761:web:8a6c49d98c5e022d2a8958"
};

app.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();

export{db, auth};
