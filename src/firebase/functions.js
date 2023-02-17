// PARA QUE NO ME LO BORRE EN FEED BRANCH
// eslint-disable-next-line import/no-unresolved
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  addDoc,
  collection,
  db,
  provider,
  getDocs,
  onAuthStateChanged,
} from './firebase.js';

// Registro con email y password
export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Agregar usuarixs registradxs a la base de datos
export function addUser(user) {
  return addDoc(collection(db, 'Users'), user);
}

// Registro con google
export function registerGoogle() {
  return signInWithPopup(auth, provider);
}

// Logueo con email y password
export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Observador
export function observerUser() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(uid);
      // ...
    }
    //      else {
    //   // User is signed out
    //   // ... los regrese al inicio de sesión!!!
    // }
  });
}

// Agregar post a la base de datos
export function addPost(post) {
  addDoc(collection(db, 'Posts'), { post, userUid: 5 });
}

// Mostrar los posts
export function getPost() {
  getDocs(collection(db, 'Posts'));
}
