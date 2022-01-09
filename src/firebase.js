// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {
  getAuth,
  // onAuthStateChanged,
  // signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7_9GUVTykxx-sw03whpTdue2naf2L0RU",
  authDomain: "akstorenp.firebaseapp.com",
  projectId: "akstorenp",
  storageBucket: "akstorenp.appspot.com",
  messagingSenderId: "653103744531",
  appId: "1:653103744531:web:bbbeab340640c0f7a121e6",
  measurementId: "G-XG7QR07BS6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider(auth);
// const auth = getAuth(firebaseApp);
// onAuthStateChanged(auth, user => {
//   // Check for user status
// });
