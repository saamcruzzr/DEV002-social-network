import { onNavigate } from "../main.js";

export const Login = () => {
    const HomeDiv = document.createElement('div');
    HomeDiv.textContent = "Logueo";
    const btnHome = document.createElement('button');

    btnHome.textContent = 'Regresar a Home';

    btnHome.addEventListener('click', () => onNavigate('/'));

    HomeDiv.appendChild(btnHome);

    return HomeDiv;
};