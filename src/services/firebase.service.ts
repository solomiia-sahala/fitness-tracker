import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { firebaseConfig } from '../config/firebase.config'
import { Database } from '@firebase/database';
import { Auth, UserCredential } from '@firebase/auth';
import { Activity } from '../interfaces/activity.interface';

export default class Firebase {
  app: FirebaseApp;
  auth: Auth;
  db: Database;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.db = getDatabase(this.app);
  }

  createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    return signOut(this.auth);
  }

  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  saveUserData(uid: string, userData: Activity): void {
    set(ref(this.db, 'users/' + uid), userData);
  }
}