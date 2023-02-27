/* eslint-disable import/no-cycle */
// PARA QUE NO ME LO BORRE EN FEED BRANCH
// import { async } from 'regenerator-runtime';
// import { async } from 'regenerator-runtime';
import { showPost } from '../components/Feed.js';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  addDoc,
  collection,
  db,
  // userUid,
  provider,
  // userLog,
  getDocs,
  // onSnapshot,
  onAuthStateChanged,
  doc,
  deleteDoc,
  onSnapshot,
  updateDoc,
  arrayRemove,
  arrayUnion,
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
    post, userUid: uidUser, nameUser, datePost, totalLikes: [],
  });
}

// Mostrar los posts
export function getPost() {
  const postSnapshot = getDocs(collection(db, 'Posts'));
  return postSnapshot;
}

// ELIMINAR documentos

export function deletePost(idPost) {
  // console.log(idPost.slice(2));
  const idPostSlice = idPost.slice(2);
  const deleteDocs = deleteDoc(doc(db, 'Posts', idPostSlice));
  return deleteDocs;
}

// EDIT
export async function edPost(postId, postEd) {
  const changePost = doc(db, 'Posts', postId);
  await updateDoc(changePost, { postId, post: postEd });
  return changePost;
}

// ACTUALIZA documentos a cada rato

export function updateCollection() {
  onSnapshot(collection(db, 'Posts'), (document) => {
    document.forEach((docu) => console.log(docu));
  });
}

// LIKES
export async function darLike(userUidLike, idPost) {
  const likes = doc(db, 'Posts', idPost);
  // const userUidLike = auth.currentUser.uid;
  await updateDoc(likes, {
    totalLikes: arrayUnion(userUidLike),
    // totalLikes: arrayUnion(auth.currentUser.uid),
  });
  return likes;
}

export async function quitarLike(userUidDislike, idPost) {
  const dislikes = doc(db, 'Posts', idPost);
  // const userUidDislike = auth.currentUser.uid;
  await updateDoc(dislikes, {
    totalLikes: arrayRemove(userUidDislike),
  });
  return dislikes;
}
