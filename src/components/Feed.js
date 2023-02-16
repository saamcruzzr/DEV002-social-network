// PARA QUE NO ME LO BORRE EN FEED BRANCH
// eslint-disable-next-line import/no-cycle
// import { onNavigate } from '../main.js';
// import { async } from 'regenerator-runtime';

import { savePost } from '../firebase/functions.js';

export const Feed = () => {
  const FeedDiv = document.createElement('div');
  const sectionFeed = `
    <header>
      <div class='headerFeed'>
        <h1 class="title_feed">SabiOld</h1>
        <div class='btnOut'>
          <p class='textOut'>Salir</p>
          <img src='./IMG/salida-de-la-puerta.png' alt='Salir de SabiOld' id='imgOut'>
        </div>
      </div>
    </header>
    <hr>
    <section class='section_feed'>
      <section class='section_profile'>
        <form action='' method='post' name='profile' id='profile'>
          <label for='name' class='name_profile'>Tú sabes quien soy:</label>
          <textarea id='textProfile' class='textarea_profile' name='textarea' placeholder='Aquí el texto a publicar'></textarea>
          <div class='buttons_profile'>
            <button class='button btnPost' id='btnPost'>Publicar</button>
            <button class='button btnPost' id='btnCancelPost'>Cancelar</button>
          </div>
        </form>
      </section>
      <hr>
      <section class='section_posts' id='posts'>
        <article class='postUsers'>
          <form action='' method='post' name='feed' id='post'>
            <label for='name' class='name_user'>nombreOtreUsuarie:</label>
            <textarea id='textPost' class='textarea_post' name='textarea'>Texto publicado</textarea>
            <div class='icon_post'>
              <img class='imgLike' src="./IMG/corazonRosa.png" alt="Corazón pintado de rosa">
              <img class='imgLike' src="./IMG/corazon.png" alt="Corazón sin pintar">  
            </div>
          </form>
        </article>
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

export const addPost = () => {
  const postForm = document.getElementById('profile');
  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const txtPost = postForm.textProfile;
    // console.log(txtPost.value);
    savePost(txtPost.value);

    document.getElementsByClassName('textarea_profile')[0].value = '';
  });
};
