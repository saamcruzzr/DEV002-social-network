import { onNavigate } from '../main.js';
import { loginUser } from '../firebase/firebase.js';

export const Login = () => {
  const LoginDiv = document.createElement('div');
  const sectionLogin = `
    <h3 class='title_login'>Iniciar Sesión</h3>
    <section class='section_login'>
        <p class='text_login'>Correo Electrónico</p>
        <input type='email' class='input_login' id='email_login'>
        <p class='error' id='errorEmailLogin'></p>

        <p class='text_login'>Contraseña</p>
        <input type='password' class='input_login' id='password_login'>
        <p class='error' id='errorPasswordLogin'></p>
    </section>
    `;

  const btnFeed = document.createElement('button');
  btnFeed.setAttribute('class', 'button btnFeed');

  LoginDiv.innerHTML = sectionLogin;
  btnFeed.textContent = 'Ingresar';

  btnFeed.addEventListener('click', () => {
    const email = document.getElementById('email_login').value;
    const password = document.getElementById('password_login').value;
    if (password) {
      loginUser(email, password)
        .then((userCredential) => {
        // Signed in
          const user = userCredential.user;
          if (email.uid === email || password) {
            console.log(user);
            console.log('estas logueado');
          }
        })
        .then(() => onNavigate('/feed'))
        .catch((error) => {
          const errorEmailLogin = document.getElementById('errorEmailLogin');
          const errorPasswordLogin = document.getElementById('errorPasswordLogin');
          if (error.code === 'auth/user-not-found') {
            errorEmailLogin.textContent = 'Usuarie no registrado';
          }
          if (error.code === 'auth/wrong-password') {
            errorPasswordLogin.textContent = 'Contraseña Incorrecta';
          }
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  });

  LoginDiv.appendChild(btnFeed);

  return LoginDiv;
};
