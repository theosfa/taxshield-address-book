// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZAl5MckGCxBGrUTOmCCWowagUkKS6a2Y",
  authDomain: "taxxshieldemail.firebaseapp.com",
  projectId: "taxxshieldemail",
  storageBucket: "taxxshieldemail.appspot.com",
  messagingSenderId: "77912596397",
  appId: "1:77912596397:web:f83fec883dc0af08f1cb24",
  measurementId: "G-HEZPQ5YHNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, db };