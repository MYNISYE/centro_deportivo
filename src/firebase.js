import app from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAyyfQeIelH9XrmBs-XJ16plyFbHUCixl0",
  authDomain: "libreria-e37db.firebaseapp.com",
  projectId: "libreria-e37db",
  storageBucket: "libreria-e37db.appspot.com",
  messagingSenderId: "17143625487",
  appId: "1:17143625487:web:d9951eb44ed95d775e307a",
  measurementId: "G-7VG3JSJNJJ"
};

app.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();

export{db, auth};
