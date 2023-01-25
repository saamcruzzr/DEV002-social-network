import { onNavigate } from "../main.js";

export const Login = () => {
    // HomeDiv o LoginDiv???
    const HomeDiv = document.createElement('div');
    HomeDiv.textContent = 'Logueo';
    const sectionLogin = `
    <h3 class="title_login">Iniciar Sesión</h3>
    <section class="section_login">
        <p class="text_login">Correo Electrónico</p>
        <input type="text" class="input_login">
        <p class="text_login">Contraseña</p>
        <input type="text" class="input_login">
    </section>
    `;

    const btnFeed = document.createElement('button');
    btnFeed.setAttribute("class", "button btnFeed");

    HomeDiv.innerHTML=sectionLogin;
    btnFeed.textContent = 'Ingresar';

    btnFeed.addEventListener('click', () => onNavigate('/feed'));

    HomeDiv.appendChild(btnFeed);

    return HomeDiv;
};