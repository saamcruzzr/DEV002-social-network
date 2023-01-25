import { onNavigate } from "../main.js";

export const Login = () => {
    const HomeDiv = document.createElement('div');
    HomeDiv.textContent = 'Logueo';
    const btnFeed = document.createElement('button');

    btnFeed.textContent = 'Ingresar';

    btnFeed.addEventListener('click', () => onNavigate('/feed'));

    HomeDiv.appendChild(btnFeed);

    return HomeDiv;
};