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

// Guardar post en firestore
export function savePost(post) {
  addDoc(collection(db, 'Posts'), { post });
}

// Mostrar los posts
export function getPost() {
  // console.log('lista de posts');
  getDocs(collection(db, 'Posts'));
}
