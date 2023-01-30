import { onNavigate } from '../main.js';
import { registerUser, addUser } from '../firebase/firebase.js';

export const Register = () => {
  const RegisterDiv = document.createElement('div');
  const sectionRegister = `
    <p id="googleRegister">continuar con Google</p>
    <h3 class='title_login'>Formulario</h3>

    <section class='section_login'>
      <form action='' method='post' name='register' id='register'>
        <label for='name' class='text_login'>Nombre Completo</label>
        <input type='text' class='input_login' id='name'>

        <label for='date' class='text_login'>Fecha de Nacimiento</label>
        <input type='text' class='input_login' id='date'>

        <label for='email' class='text_login'>Correo Electrónico</label>
        <input type='email' class='input_login' id='email'>

        <label for='password' class='text_login'>Contraseña</label>
        <input type='password' class='input_login' id='password'>
          
        <label for='confirm_password' class='text_login'>Confirmar Contraseña</label>
        <input type='password' class='input_login' id='confirm_password'>
        <!--<button type='submit' class='btnFeed' id='btnFeed'>Guardar Datos</button>-->
        <p>continuar con Google</p>
      </form>
    </section>
    `;


 
  
  // const formRegister = document.getElementById('register');
  // console.log(formRegister);
  const div = document.createElement('div');

  const btnFeed = document.createElement('button');
  btnFeed.setAttribute('class', 'button btnFeed');

  const p = document.createElement('p');
  p.textContent = 'prueba Google';

  div.appendChild(btnFeed);
  div.appendChild(p);

  RegisterDiv.innerHTML = sectionRegister;
  btnFeed.textContent = 'Guardar Datos';

  // const googleRegister = `
  //   <p class='text_login'>continuar con Google</p>
  // `;
  // RegisterDiv.innerHTML = googleRegister;

  // const btnGoogle = document.getElementById('googleRegister');
  // btnGoogle.addEventListener('click', () => {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   auth.signInWithPoup(provider)
  //     // .then(result => {

  //     // })
  // });

 

  btnFeed.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // const confirmPassword = document.getElementById('confirm_password').value;
    registerUser(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        addUser({
          authUid: user.uid,
          name,
          date,
          email,
        }).then(() => {
          onNavigate('/feed');
        });
        // ...
      });
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // ..
    // });
  });

  RegisterDiv.appendChild(div);

  return RegisterDiv;
};
