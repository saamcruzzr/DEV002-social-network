import { onNavigate } from "../main.js";

export const Feed = () => {
    const HomeDiv = document.createElement('div');
    HomeDiv.textContent = 'Muro';
    const btnHome = document.createElement('button');

    btnHome.textContent = 'Regresar a Inicio';

    btnHome.addEventListener('click', () => onNavigate('/'));

    HomeDiv.appendChild(btnHome);

    return HomeDiv;

};