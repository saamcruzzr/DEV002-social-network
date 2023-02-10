// eslint-disable-next-line import/no-unresolved
// import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js';
// import {  } from '../src/firebase/firebase.js';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebase.js';

// Registro con email y password
export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Logueo con email y password
export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
