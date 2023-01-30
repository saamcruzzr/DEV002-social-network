import { onNavigate } from '../main.js';

export const Feed = () => {
  const FeedDiv = document.createElement('div');
  FeedDiv.textContent = 'Muro';
  const btnHome = document.createElement('button');

  btnHome.textContent = 'Regresar a Inicio';

  btnHome.addEventListener('click', () => onNavigate('/'));

  FeedDiv.appendChild(btnHome);

  return FeedDiv;
};
