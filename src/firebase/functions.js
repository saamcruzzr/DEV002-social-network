// PARA QUE NO ME LO BORRE EN FEED BRANCH
// eslint-disable-next-line import/no-unresolved, import/no-cycle
// import { async } from 'regenerator-runtime';
// eslint-disable-next-line import/no-cycle
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
  userLog,
  getDocs,
  onAuthStateChanged,
  doc,
  updateDoc,
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
  return postSnapshot;
}

export async function editPost(userIn, changePost) {
  const postDocRef = doc(db, 'Posts', 'post');
  await updateDoc(postDocRef, { post: '' });
  return postDocRef;
}
// const frankDocRef = doc(db, "users", "frank");
// await setDoc(frankDocRef, {
//     name: "Frank",
//     favorites: { food: "Pizza", color: "Blue", subject: "recess" },
//     age: 12
// });

// // To update age and favorite color:
// await updateDoc(frankDocRef, {
//     "age": 13,
//     "favorites.color": "Red"
// });
