import { onNavigate } from "../main.js";

export const Register = () => {
    const HomeDiv = document.createElement('div');
    HomeDiv.textContent = 'Registro';
    const btnFeed = document.createElement('button');

    btnFeed.textContent = 'Registrar';

    btnFeed.addEventListener('click', () => onNavigate('/feed'));

    HomeDiv.appendChild(btnFeed);

    return HomeDiv;
};