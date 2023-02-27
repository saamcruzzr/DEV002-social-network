// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
import {
  registerUser,
  addUser,
  registerGoogle,
  updateCollection,
} from '../firebase/functions.js';
import { savePost, showPost } from './Feed.js';

export const Register = () => {
  const RegisterDiv = document.createElement('div');
  const sectionRegister = `
    <header>
      <div>
        <h1 class="title">SabiOld</h1>
      </div>
    </header>
    <h3 class='title_login'>Formulario</h3>

    <section class='section_login'>
      <form novalidate action='' method='post' name='register' id='register'>
        <label for='name' class='text_login'>Nombre Completo</label>
        <input type='text' class='input_login' id='name'>
        <p class='error' id='errorName'></p>

        <label for='email' class='text_login'>Correo Electrónico</label>
        <input type='email' class='input_login' id='email'>
        <p class='error' id='errorEmail'></p>

        <label for='password' class='text_login'>Contraseña</label>
        <input type='password' class='input_login' id='password' required>
        <p class='error' id='errorPassword'></p> 
          
        <label for='confirm_password' class='text_login'>Confirmar Contraseña</label>
        <input type='password' class='input_login' id='confirm_password'>
        <p class='error' id='errorConfirmPassword'></p>  
      </form>
    </section>
    `;

  const buttonsDiv = document.createElement('div');
  const btnFeed = document.createElement('button');
  btnFeed.setAttribute('class', 'button btnFeed');

  const googleRegister = document.createElement('p');
  googleRegister.textContent = 'Registrarse con Google';
  googleRegister.setAttribute('class', 'authGoogle');

  buttonsDiv.appendChild(btnFeed);
  buttonsDiv.appendChild(googleRegister);

  RegisterDiv.innerHTML = sectionRegister;
  btnFeed.textContent = 'Guardar Datos';

  btnFeed.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    if (confirmPassword === password && name !== '') {
      registerUser(email, password)
        .then((userCredential) => {
        // Sign in
          const user = userCredential.user;
          addUser({
            authUid: user.uid,
            name,
            email,
          }).then(() => {
            onNavigate('/feed');
            savePost();
            showPost();
            updateCollection();
          });
        })
        .catch((error) => {
          const errorEmail = document.getElementById('errorEmail');
          const errorPassword = document.getElementById('errorPassword');
          if (error.code === 'auth/invalid-email') { // no teclea email
            errorEmail.textContent = 'Es necesario poner email';
          }
          if (error.code === 'auth/missing-email') { // no hay email
            errorEmail.textContent = 'Es necesario poner email';
          }
          if (error.code === 'auth/internal-error') { // no tiene @ "affd.fafa.fa"
            errorEmail.textContent = 'Es necesario poner email válido';
          }
          if (error.code === 'auth/email-already-in-use') { // ya está en uso el correo
            errorEmail.textContent = 'Este email ya está en uso';
          }
          if (error.code === 'auth/weak-password') { // menos de 6 caracteres
            errorPassword.textContent = 'La contraseña debe contener más de 6 caracteres';
          }
        });
    } else if (confirmPassword !== password) {
      const errorConfirmPassword = document.getElementById('errorConfirmPassword');
      errorConfirmPassword.textContent = 'No coincide contraseña';
    } else if (name === '') {
      const errorName = document.getElementById('errorName');
      errorName.textContent = 'Es necesario escribir un nombre';
    }
  });

  RegisterDiv.appendChild(buttonsDiv);

  googleRegister.addEventListener('click', () => {
    registerGoogle()
      .then((result) => {
        const user = result.user;
        addUser({
          authUid: user.uid,
          name: user.displayName,
          email: user.email,
        }).then(() => {
          onNavigate('/feed');
          savePost();
          showPost();
          updateCollection();
        });
      });
  });
  return RegisterDiv;
};
