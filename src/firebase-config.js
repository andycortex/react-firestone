// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwAU3xnts-dNlxL5QLT_3vrWFhZHttVVc",
  authDomain: "crud-test-react-e69f1.firebaseapp.com",
  projectId: "crud-test-react-e69f1",
  storageBucket: "crud-test-react-e69f1.appspot.com",
  messagingSenderId: "775383207597",
  appId: "1:775383207597:web:abb1ceec37cdf9d6880024",
  measurementId: "G-BC0TP8GNF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);