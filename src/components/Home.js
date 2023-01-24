import { onNavigate } from "../main.js";

export const Home = () => {
    const HomeDiv = document.createElement('div');
    const msjInicio = `
    <section>
        <p>¡Bienvenidas y bienvenidos a SabiOld.
        <br> Su red social favorita!
        <br> Por favor, elige la opción que necesites</p>
    </section>
    `;
    const btnRegister = document.createElement('button');
    const btnLogin = document.createElement('button');

    HomeDiv.innerHTML = msjInicio;
    btnRegister.textContent = 'Registrarse';
    btnLogin.textContent = 'Iniciar Sesión';

    btnRegister.addEventListener('click', () => onNavigate('/register'));
    btnLogin.addEventListener('click', () => onNavigate('/login'));

    HomeDiv.appendChild(btnRegister);
    HomeDiv.appendChild(btnLogin);

    return HomeDiv;
};