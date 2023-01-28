import { onNavigate } from "../main.js";
import { registerUser } from '../firebase/firebase.js'

export const Register = () => {
    const RegisterDiv = document.createElement('div');
    const sectionRegister = `
    <h3 class="title_login">Formulario</h3>
    <section class="section_login">
        <p class="text_login">Nombre Completo</p>
        <input type="text" class="input_login">
        <p class="text_login">Fecha de Nacimiento</p>
        <input type="text" class="input_login">

        <p class="text_login">Correo Electrónico</p>
        <input type="text" class="input_login" id="email">

        <p class="text_login">Contraseña</p>
        <input type="text" class="input_login" id="password">
        
        <p class="text_login">Confirmar Contraseña</p>
        <input type="text" class="input_login">
    </section>
    `;


    const btnFeed = document.createElement('button');
    btnFeed.setAttribute("class", "button btnFeed");

    RegisterDiv.innerHTML = sectionRegister;
    btnFeed.textContent = 'Guardar Datos';

    btnFeed.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        registerUser(email,password).then(() => onNavigate('/feed'))        
    });

    RegisterDiv.appendChild(btnFeed);

    return RegisterDiv;
};