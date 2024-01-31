import { initializeApp } from "firebase/app";
import { getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from '../config/firebase.config'

export default class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.db = getFirestore();
  }

  createUserWithEmailAndPassword(email, password) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signInWithEmailAndPassword(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut() {
    return signOut(this.auth);
  }

  resetPassword(email) {
    return sendPasswordResetEmail(this.auth, email);
  }
}
