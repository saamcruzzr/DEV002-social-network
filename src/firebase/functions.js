/* eslint-disable import/no-cycle */
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
      const uid = user.uid;
      const nameU = user.displayName;
      const dateP = Date.now();
      // console.log(uid);
      callback(txt, uid, nameU, dateP);
      showPost();
    }
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

// ACTUALIZA la coleccion a cada rato
export function updateCollection() {
  onSnapshot(collection(db, 'Posts'));
}

// Agregar Likes
export async function darLike(userUidLike, idPost) {
  const likes = doc(db, 'Posts', idPost);
  await updateDoc(likes, {
    totalLikes: arrayUnion(userUidLike),
  });
}

// Quitar Likes
export async function quitarLike(userUidDislike, idPost) {
  const dislikes = doc(db, 'Posts', idPost);
  await updateDoc(dislikes, {
    totalLikes: arrayRemove(userUidDislike),
  });
}
