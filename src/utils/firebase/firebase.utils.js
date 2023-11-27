import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;
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
        ...additionalInformation
      });
    } catch (error) {
      console.error('Error creating the user ', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  try {
    return await createUserWithEmailAndPassword(auth, email, password);

  } catch (error) {
    console.error('Error creating the user ', error.message);
  }
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  try {
    return await signInWithEmailAndPassword(auth, email, password);

  } catch (error) {
    console.error('Error signing in the user ', error.message);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out the user ', error.message);
  }
};

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};