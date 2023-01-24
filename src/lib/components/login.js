import { onNavigate } from "../../main.js";

export const logIn = () => {
    const homeDiv = document.createElement('div');
    homeDiv.textContent = 'Bienvenid@ al Login';
    const buttonHome = document.createElement('button');

    buttonHome.textContent = 'Regresar al Inicio';

    buttonHome.addEventListener('click', () => onNavigate('/'));

    homeDiv.appendChild(buttonHome);

    return homeDiv;
}