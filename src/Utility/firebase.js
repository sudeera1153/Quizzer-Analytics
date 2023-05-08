// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "@firebase/firestore";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGgouSE05Cm_tfLyzwQwTxAC6w3X8L3Oo",
  authDomain: "quizzer-77675.firebaseapp.com",
  projectId: "quizzer-77675",
  storageBucket: "quizzer-77675.appspot.com",
  messagingSenderId: "1051955775110",
  appId: "1:1051955775110:web:bd05817fd06149bdf53307",
  measurementId: "G-DMTGPV2TRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app