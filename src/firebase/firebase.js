// SERVICIOS CDP https://firebase.google.com/docs/web/learn-more?hl=es-419#libraries-cdn
// API REFERENCE JS FIREBASE https://firebase.google.com/docs/reference/js?hl=es-419
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js';
import { getFirestore, addDoc, collection } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js';
import { firebaseConfig } from './fconfig.js';
// OJO!! CHECAR VERSIONES !!!

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Accedemos a la base de datos firestore
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();
// Autenticacion con google
const provider = new GoogleAuthProvider();

// Registro con email y password
export function registerUser(email, password) {
  return new Promise((resolve,reject) => {
    createUserWithEmailAndPassword(auth, email, password).then(data => resolve(data.name)).catch(error => reject(error.msg))
  });
}

// export function registerUser(email, password) {
//   return createUserWithEmailAndPassword(auth, email, password);
// }

// Agregar usuarixs registradxs a la base de datos
export function addUser(user) {
  return addDoc(collection(db, 'Users'), user);
}

// Registro con google
export function registerGoogle() {
  return signInWithPopup(auth, provider);
}

export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// DOCUMENTACIÓN:
// AUTENTICACIÓN https://firebase.google.com/docs/auth/web/start?hl=es-419#add-initialize-sdk
// https://firebase.google.com/docs/reference/js/auth.md?hl=es-419#createuserwithemailandpassword
// Firebase> Documentación de Firebase> JavaScript API reference> Referencia> USER interface
// https://firebase.google.com/docs/reference/js/auth.user?hl=es-419
// PARA CERRAR SESIÓN https://firebase.google.com/docs/reference/js/auth.md?hl=es-419#signout

export {
  initializeApp, createUserWithEmailAndPassword, signInWithEmailAndPassword, auth,
};
