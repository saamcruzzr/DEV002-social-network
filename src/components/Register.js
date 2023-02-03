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
  googleRegister.textContent = 'Continuar con Google';
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
        // Signed in
          const user = userCredential.user;
          addUser({
            authUid: user.uid,
            name,
            email,
          }).then(() => {
            onNavigate('/feed');
          });
        })
        .catch((error) => {
          const errorEmail = document.getElementById('errorEmail');
          const errorPassword = document.getElementById('errorPassword');
          if (error.code === 'auth/invalid-email') { // no teclea email
            // const errorEmail = document.getElementById('errorEmail');
            errorEmail.textContent = 'Es necesario poner email';
          }
          if (error.code === 'auth/missing-email') { // no hay email
            // const errorEmail = document.getElementById('errorEmail');
            errorEmail.textContent = 'Es necesario poner email';
          }
          if (error.code === 'auth/internal-error') { // no tiene @ "affd.fafa.fa"
            // const errorEmail = document.getElementById('errorEmail');
            errorEmail.textContent = 'Es necesario poner email válido';
          }
          if (error.code === 'auth/email-already-in-use') { // ya está en uso el correo
            // const errorEmail = document.getElementById('errorEmail');
            errorEmail.textContent = 'Este email ya está en uso';
          }
          if (error.code === 'auth/weak-password') { // menos de 6 caracteres
            // const errorPassword = document.getElementById('errorPassword');
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
