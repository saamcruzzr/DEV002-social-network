import { onNavigate } from "../../main.js";

export const register = () => {
    const homeDiv = document.createElement('div');
    homeDiv.textContent = 'Bienvenid@ al registro';
    const buttonHome = document.createElement('button');

    buttonHome.textContent = 'Regresar al Inicio';

    buttonHome.addEventListener('click', () => onNavigate('/'));

    homeDiv.appendChild(buttonHome);

    return homeDiv;
}