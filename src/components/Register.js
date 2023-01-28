import { onNavigate } from "../main.js";
import { registerUser, addUser } from '../firebase/firebase.js'

export const Register = () => {
    const RegisterDiv = document.createElement('div');
    const sectionRegister = `
    <h3 class="title_login">Formulario</h3>
    <section class="section_login">
        <p class="text_login">Nombre Completo</p>
        <input type="text" class="input_login" id="name">

        <p class="text_login">Fecha de Nacimiento</p>
        <input type="text" class="input_login" id="date">

        <p class="text_login">Correo Electrónico</p>
        <input type="email" class="input_login" id="email">

        <p class="text_login">Contraseña</p>
        <input type="password" class="input_login" id="password">
        
        <p class="text_login">Confirmar Contraseña</p>
        <input type="password" class="input_login" id="confirm_password">
    </section>
    `;


    const btnFeed = document.createElement('button');
    btnFeed.setAttribute("class", "button btnFeed");

    RegisterDiv.innerHTML = sectionRegister;
    btnFeed.textContent = 'Guardar Datos';

    btnFeed.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        registerUser(email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            addUser({
                authUid: user.uid,
                name,
                date,
                email
            }).then(() => {
                onNavigate('/feed')
            })
            // ...
        })
          // .catch((error) => {
          //   const errorCode = error.code;
          //   const errorMessage = error.message;
          //   // ..
          // });       
    });

    RegisterDiv.appendChild(btnFeed);

    return RegisterDiv;
};