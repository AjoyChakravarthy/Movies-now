import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAoW2jBfBm1NJttnmI0uIwuXbakaf77DuA",
  authDomain: "movies-now-a47b5.firebaseapp.com",
  projectId: "movies-now-a47b5",
  storageBucket: "movies-now-a47b5.appspot.com",
  messagingSenderId: "706630670205",
  appId: "1:706630670205:web:29dc3cbaafe7e04d531e14",
  measurementId: "G-4VHJTZ2VLD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
export const db = getFirestore(app);