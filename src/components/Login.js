import { onNavigate } from "../main.js";
import { loginUser } from "../firebase/firebase.js";

export const Login = () => {
    const LoginDiv = document.createElement('div');
    const sectionLogin = `
    <h3 class="title_login">Iniciar Sesión</h3>
    <section class="section_login">
        <p class="text_login">Correo Electrónico</p>
        <input type="email" class="input_login" id="email_login">

        <p class="text_login">Contraseña</p>
        <input type="password" class="input_login" id="password_login">
    </section>
    `;

    const btnFeed = document.createElement('button');
    btnFeed.setAttribute("class", "button btnFeed");

    LoginDiv.innerHTML=sectionLogin;
    btnFeed.textContent = 'Ingresar';

    btnFeed.addEventListener('click', () => {
        const email = document.getElementById('email_login').value;
        const password = document.getElementById('password_login').value;
        loginUser(email,password).then(() => onNavigate('/feed'));
    });

    LoginDiv.appendChild(btnFeed);

    return LoginDiv;
};