// eslint-disable-next-line import/no-unresolved
// import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js';
// import {  } from '../src/firebase/firebase.js';
import { auth, createUserWithEmailAndPassword } from './firebase.js';

// Registro con email y password
export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
