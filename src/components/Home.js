import { onNavigate } from "../main.js";

export const Home = () => {
    const HomeDiv = document.createElement('div');
    const btnRegister = document.createElement('button');
    const btnLogin = document.createElement('button');

    btnRegister.textContent = 'Registrarse';
    btnLogin.textContent = 'Iniciar Sesión';

    btnRegister.addEventListener('click', () => onNavigate('/register'));
    btnLogin.addEventListener('click', () => onNavigate('/login'));

    HomeDiv.appendChild(btnRegister);
    HomeDiv.appendChild(btnLogin);

    return HomeDiv;
};