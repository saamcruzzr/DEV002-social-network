// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

export const Feed = () => {
  const FeedDiv = document.createElement('div');
  const sectionFeed = `
    <section class='section_profile'>
      <form action='' method='post' name='profile' id='profile'>
        <label for='name' class='name_profile'>Tú sabes quien soy:</label>
        <textarea name='textarea' rows='10' cols='50'></textarea>
        <button class='button btnPost'>Publicar</button>
        <button class='button btnCancelPost'>Cancelar</button>
      </form>
    </section>
    <section class='section_posts' id='post'>
    </section>
  `;
  FeedDiv.textContent = 'Muro';
  FeedDiv.innerHTML = sectionFeed;
  const btnHome = document.createElement('button');
  btnHome.textContent = 'Regresar a Inicio';
  btnHome.addEventListener('click', () => onNavigate('/'));
  FeedDiv.appendChild(btnHome);
  return FeedDiv;
};
