// SERVICIOS CDP https://firebase.google.com/docs/web/learn-more?hl=es-419#libraries-cdn
// API REFERENCE JS FIREBASE https://firebase.google.com/docs/reference/js?hl=es-419
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider,
} from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js';
import { getFirestore, addDoc, collection } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js';
import { firebaseConfig } from './fconfig.js';
// OJO!! CHECAR VERSIONES !!!

// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const provider = new GoogleAuthProvider();

// AUTENTICACIÓN https://firebase.google.com/docs/auth/web/start?hl=es-419#add-initialize-sdk

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();
// https://firebase.google.com/docs/reference/js/auth.md?hl=es-419#createuserwithemailandpassword
export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
  // .then((userCredential) => {
  // Signed in
  // const user = userCredential.user;
  // ...
  // });
}

export function addUser(user) {
  return addDoc(collection(db, 'Users'), user);
}
// Firebase> Documentación de Firebase> JavaScript API reference> Referencia> USER interface
// https://firebase.google.com/docs/reference/js/auth.user?hl=es-419
// PARA CERRAR SESIÓN https://firebase.google.com/docs/reference/js/auth.md?hl=es-419#signout

// Registro con google

// export function registerGoogle() {
//   return signInWithPopup(auth, provider)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       const user = result.user;
//       // ...
//     }).catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });
// }
