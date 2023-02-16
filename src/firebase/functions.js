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
  // userPost,
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
  // console.log(userPost);
  addDoc(collection(db, 'Posts'), { post, userUid: 5 });
  // console.log(userPost);
}

// Mostrar los posts
export function getPost() {
  // console.log('lista de posts');
  getDocs(collection(db, 'Posts'));
}
