import { onNavigate } from "../main.js";

export const Home = () => {
    const HomeDiv = document.createElement('div');
    const msjInicio = `
    <section>
        <p>¡Bienvenidas y bienvenidos a SabiOld.
        Su red social favorita!
        Por favor, elige la opción que necesites</p>
    </section>
    `;
    const btnLogin = document.createElement('button');
    const btnRegister = document.createElement('button');

    HomeDiv.innerHTML = msjInicio;
    btnLogin.textContent = 'INICIAR SESIÓN';
    btnRegister.textContent = 'REGISTRARSE';

    btnLogin.addEventListener('click', () => onNavigate('/login'));
    btnRegister.addEventListener('click', () => onNavigate('/register'));

    HomeDiv.appendChild(btnLogin);
    HomeDiv.appendChild(btnRegister);

    return HomeDiv;
};