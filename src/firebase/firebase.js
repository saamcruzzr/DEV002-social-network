// SERVICIOS CDP https://firebase.google.com/docs/web/learn-more?hl=es-419#libraries-cdn
// API REFERENCE JS FIREBASE https://firebase.google.com/docs/reference/js?hl=es-419
import { firebaseConfig } from '../firebase/fconfig.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js"
// OJO!! CHECAR VERSIONES !!!

// Your web app's Firebase configuration


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

//AUTENTICACIÓN https://firebase.google.com/docs/auth/web/start?hl=es-419#add-initialize-sdk

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();
//https://firebase.google.com/docs/reference/js/auth.md?hl=es-419#createuserwithemailandpassword
export function registerUser (email,password){
  return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  // });
}

 



//Firebase> Documentación de Firebase> JavaScript API reference> Referencia> USER interface
//https://firebase.google.com/docs/reference/js/auth.user?hl=es-419
//PARA CERRAR SESIÓN https://firebase.google.com/docs/reference/js/auth.md?hl=es-419#signout