import { onNavigate } from "../main";

export const Home = () => {
    const HomeDiv = document.createElement('div');
    const btnRegister = document.createElement('button');
    const btnLogin = document.createElement('button');

    btnRegister.textContent = 'Registrarse';
    btnLogin.textContent = 'Iniciar Sesión';

    btnRegister.addEventListener('click', () => onNavigate('/register'));

    HomeDiv.appendChild(btnRegister);
    HomeDiv.appendChild(btnLogin);

    return HomeDiv;
};