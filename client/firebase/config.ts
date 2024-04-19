// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBGOVBCsD-tov8CK9g15mfooQgmd-DDOnI",

    authDomain: "butinder.firebaseapp.com",
  
    projectId: "butinder",
  
    storageBucket: "butinder.appspot.com",
  
    messagingSenderId: "393645639641",
  
    appId: "1:393645639641:web:83c4008e18fe9ed1ebfbc8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default app;
export { auth };
export { db };