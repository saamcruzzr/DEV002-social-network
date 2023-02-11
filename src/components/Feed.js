// eslint-disable-next-line import/no-cycle
// import { onNavigate } from '../main.js';

export const Feed = () => {
  const FeedDiv = document.createElement('div');
  const sectionFeed = `
    <header>
      <div class='headerFeed'>
        <h1 class="title_feed">SabiOld</h1>
        <div class='btnSalir'>
          <p>Salir</p>
          <img src='./IMG/salida-de-la-puerta.png' alt='Salir de SabiOld' id='salida'>
        </div>
      </div>
    </header>
    <section class='section_feed'>
      <section class='section_profile'>
        <form action='' method='post' name='profile' id='profile'>
          <label for='name' class='name_profile'>Tú sabes quien soy:</label>
          <textarea  class='textarea_feed' name='textarea'></textarea>
          <!--<input type='text' class='input_feed' id='feedPost'>-->
          <div class='buttons_feed'>
            <button class='button btnPost' id='btnPost'>Publicar</button>
            <button class='button btnPost' id='btnCancelPost'>Cancelar</button>
          </div>
        </form>
      </section>
      <section class='section_posts' id='posts'>
        Varias publicaciones
        <article>Aquí una publicacion</article>
      </section>
    </section>
  `;
  // FeedDiv.textContent = 'Muro';
  FeedDiv.innerHTML = sectionFeed;
  // const btnHome = document.createElement('button');
  // btnHome.textContent = 'Regresar a Inicio';
  // btnHome.addEventListener('click', () => onNavigate('/'));
  // FeedDiv.appendChild(btnHome);
  return FeedDiv;
};
