import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCazdUR9wQxdDuoUXQ_oAf9To3ohnPXVts",
    authDomain: "e-commerce-bdde6.firebaseapp.com",
    projectId: "e-commerce-bdde6",
    storageBucket: "e-commerce-bdde6.appspot.com",
    messagingSenderId: "253575799457",
    appId: "1:253575799457:web:e9968663a40c78fd9086e0",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log('userDocRef: ', userDocRef);

  const userDocSnapshot = await getDoc(userDocRef);
  console.log('userDocSnapshot: ', userDocSnapshot);
  if(!userDocSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.error('Error creating the user ', error.message);
    }
  }

  return userDocRef;
};