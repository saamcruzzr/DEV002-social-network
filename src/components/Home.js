import { onNavigate } from "../main.js";

export const Home = () => {
    const HomeDiv = document.createElement('div');
    const msjInicio = `
    <section class="section_home">
        <p class="text_initial">¡Bienvenidas y bienvenidos a SabiOld. Su red social favorita!</p>
        <p class="text_initial">Por favor, elige la opción que necesites</p>
    </section>
    `;
    const btnLogin = document.createElement('button');
    const btnRegister = document.createElement('button');
    btnLogin.setAttribute("class", "button btnLogin");
    btnRegister.setAttribute("class", "button btnRegister");

    HomeDiv.innerHTML = msjInicio;
    btnLogin.textContent = 'Iniciar Sesión';
    btnRegister.textContent = 'Registrarse';

    btnLogin.addEventListener('click', () => onNavigate('/login'));
    btnRegister.addEventListener('click', () => onNavigate('/register'));

    HomeDiv.appendChild(btnLogin);
    HomeDiv.appendChild(btnRegister);
    
    return HomeDiv;
};