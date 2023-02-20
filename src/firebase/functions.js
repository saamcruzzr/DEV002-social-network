// PARA QUE NO ME LO BORRE EN FEED BRANCH
// eslint-disable-next-line import/no-unresolved, import/no-cycle
import { showPost } from '../components/Feed.js';
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
  // onSnapshot,
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
export function observerUser(callback, txt) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      const nameU = user.displayName;
      const dateP = Date.now();
      // console.log(uid);
      callback(txt, uid, nameU, dateP);
      showPost();
      // ...
    }
    //      else {
    //   // User is signed out
    //   // ... los regrese al inicio de sesión!!!
    // }
  });
}

// Agregar post a la base de datos
export function addPost(post, uidUser, nameUser, datePost) {
  addDoc(collection(db, 'Posts'), {
    post, userUid: uidUser, nameUser, datePost,
  });
}

// Mostrar los posts
export async function getPost() {
  const postSnapshot = await getDocs(collection(db, 'Posts'));
  // const postSnapshot = onSnapshot(collection(db, 'Posts'));
  return postSnapshot;
}
