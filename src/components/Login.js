// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
import { loginUser, registerGoogle } from '../firebase/functions.js';

export const Login = () => {
  const LoginDiv = document.createElement('div');
  const sectionLogin = `
    <header>
      <div>
        <h1 class="title">SabiOld</h1>
      </div>
    </header>
    <h3 class='title_login'>Iniciar Sesión</h3>

    <section class='section_login'>
      <form action='' method='post' name='login' id='login'>
        <label for='email_login' class='text_login'>Correo Electrónico</label>
        <input type='email' class='input_login' id='email_login'>
        <p class='error' id='errorEmailLogin'></p>

        <label for='password_login' class='text_login'>Contraseña</label>
        <input type='password' class='input_login' id='password_login'>
        <p class='error' id='errorPasswordLogin'></p>
      </form>   
    </section>
    `;

  const buttonsDivLog = document.createElement('div');
  const btnLog = document.createElement('button');
  btnLog.setAttribute('class', 'button btnLog');

  const googleLogin = document.createElement('p');
  googleLogin.textContent = 'Iniciar con Google';
  googleLogin.setAttribute('class', 'authGoogle');

  buttonsDivLog.appendChild(btnLog);
  buttonsDivLog.appendChild(googleLogin);

  LoginDiv.innerHTML = sectionLogin;
  btnLog.textContent = 'Ingresar';

  btnLog.addEventListener('click', () => {
    const email = document.getElementById('email_login').value;
    const password = document.getElementById('password_login').value;
    const errorEmailLogin = document.getElementById('errorEmailLogin');
    const errorPasswordLogin = document.getElementById('errorPasswordLogin');

    if (email && password) {
      loginUser(email, password)
        .then(() => onNavigate('/feed'))
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            errorEmailLogin.textContent = 'Usuarie no registrado';
          }
          if (error.code === 'auth/wrong-password') {
            errorPasswordLogin.textContent = 'Contraseña Incorrecta';
          }
        });
    } else if (!email) {
      errorEmailLogin.textContent = 'Debe poner un correo';
    } else if (!password) {
      errorPasswordLogin.textContent = 'Debe poner una contraseña';
    }
  });

  LoginDiv.appendChild(buttonsDivLog);

  googleLogin.addEventListener('click', () => {
    registerGoogle()
      .then((result) => {
        if('email no esta registrado') {
          console.log('Tu correo no está registrado');
        }
        console.log(result);
        console.log(result.user.email);
        console.log(result.user.displayName);
        console.log(result.user.auth);
        console.log(result.user.uid);

        // console.log(result.email);


        // console.log('registrada con google', result);
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // const user = result.user;

        // addUser({
        //   authUid: user.uid,
        //   name: user.displayName,
        //   email: user.email,
        // }).then(() => {
        onNavigate('/feed');
        // });
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          // errorEmailLogin.textContent = 'Usuarie no registrado';
          console.log('correo no registrado');
        }
      });
  });

  return LoginDiv;
};
