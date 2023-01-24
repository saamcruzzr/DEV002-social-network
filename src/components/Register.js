import { onNavigate } from "../main.js";

export const Register = () => {
    const HomeDiv = document.createElement('div');
    HomeDiv.textContent = "Registro";
    const btnHome = document.createElement('button');

    btnHome.textContent = 'Regresar a Home';

    btnHome.addEventListener('click', () => onNavigate('/'));

    HomeDiv.appendChild(btnHome);

    return HomeDiv;
};