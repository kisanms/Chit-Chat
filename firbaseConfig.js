// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHwH6lqunaxtybmS8pCHhpFkQVND-3LJ8",
  authDomain: "chit-chat-3b0d7.firebaseapp.com",
  projectId: "chit-chat-3b0d7",
  storageBucket: "chit-chat-3b0d7.appspot.com",
  messagingSenderId: "214599762533",
  appId: "1:214599762533:web:9db9225f0dcb97eed8fc8c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
