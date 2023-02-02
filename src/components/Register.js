import { onNavigate } from '../main.js';
import { registerUser, addUser, registerGoogle } from '../firebase/firebase.js';

export const Register = () => {
  const RegisterDiv = document.createElement('div');
  const sectionRegister = `
    <h3 class='title_login'>Formulario</h3>

    <section class='section_login'>
      <form action='' method='post' name='register' id='register'>
        <label for='name' class='text_login'>Nombre Completo</label>
        <input type='text' class='input_login' id='name'>

        <label for='email' class='text_login'>Correo Electrónico</label>
        <input type='email' class='input_login' id='email'>
        <p class='error' id='errorEmail'></p>

        <label for='password' class='text_login'>Contraseña</label>
        <input type='password' class='input_login' id='password'>
          
        <label for='confirm_password' class='text_login'>Confirmar Contraseña</label>
        <input type='password' class='input_login' id='confirm_password'>
        <p class='error' id='errorPassword'></p>  
      </form>
    </section>
    `;

  const buttonsDiv = document.createElement('div');
  const btnFeed = document.createElement('button');
  btnFeed.setAttribute('class', 'button btnFeed');

  const googleRegister = document.createElement('p');
  googleRegister.textContent = 'Continuar con Google';
  googleRegister.setAttribute('class', 'authGoogle');

  buttonsDiv.appendChild(btnFeed);
  buttonsDiv.appendChild(googleRegister);

  RegisterDiv.innerHTML = sectionRegister;
  btnFeed.textContent = 'Guardar Datos';
  btnFeed.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email');
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    // prueba-----------------------------------------
    const form = document.getElementsByTagName('form')[1];
    console.log(form);
    let error = email;
    while ((error = error.nextSibling).nodeType != 1);

    // según la especificación HTML5
    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


    if (confirmPassword === password) {
      registerUser(email.value, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          addUser({
            authUid: user.uid,
            name,
            email,
          }).then(() => {
            onNavigate('/feed');
          });
          // ...
        });
      // .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // console.log(errorCode, errorMessage);
      // ..
      // });
    } else {
      const errorPassword = document.getElementById('errorPassword');
      errorPassword.textContent = 'No coincide contraseña';
      // errorPassword.innerHTML = 'Tas bien? Las contraseñas no coinciden';
      // console.log("contraseña invalido");
    }
  });

  RegisterDiv.appendChild(buttonsDiv);

  googleRegister.addEventListener('click', () => {
    registerGoogle()
      .then((result) => {
        // console.log('registrada con google', result);
        const user = result.user;

        addUser({
          authUid: user.uid,
          name: user.displayName,
          email: user.email,
        }).then(() => {
          onNavigate('/feed');
        });
      });
    // }).catch((error) => {
    // // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.customData.email;
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    // // ...
    // });
  });
  return RegisterDiv;
};
