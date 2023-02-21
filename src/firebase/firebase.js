// SERVICIOS CDP https://firebase.google.com/docs/web/learn-more?hl=es-419#libraries-cdn
// API REFERENCE JS FIREBASE https://firebase.google.com/docs/reference/js?hl=es-419
// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js';
// eslint-disable-next-line import/no-unresolved
import {
  getFirestore, addDoc, collection, getDocs, onSnapshot, doc, updateDoc,
// eslint-disable-next-line import/no-unresolved
} from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js';

import { firebaseConfig } from './fconfig.js';

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Cloud Firestore y obtenga una referencia al servicio
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();
// const userPost = auth.currentUser;

const userLog = auth.currentUser;

// Autenticacion con google
const provider = new GoogleAuthProvider();

// eslint-disable-next-line max-len
export {
  initializeApp,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getFirestore,
  addDoc,
  getDocs,
  onSnapshot,
  collection,
  auth,
  db,
  provider,
  userLog,
  onAuthStateChanged,
  doc,
  updateDoc,
};

// DOCUMENTACIÓN:
// AUTENTICACIÓN https://firebase.google.com/docs/auth/web/start?hl=es-419#add-initialize-sdk
// https://firebase.google.com/docs/reference/js/auth.md?hl=es-419#createuserwithemailandpassword
// Firebase> Documentación de Firebase> JavaScript API reference> Referencia> USER interface
// https://firebase.google.com/docs/reference/js/auth.user?hl=es-419
// PARA CERRAR SESIÓN https://firebase.google.com/docs/reference/js/auth.md?hl=es-419#signout
