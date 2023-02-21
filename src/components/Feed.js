// PARA QUE NO ME LO BORRE EN FEED BRANCH
// eslint-disable-next-line import/no-cycle
// import { onNavigate } from '../main.js';
// import { async } from 'regenerator-runtime';

// eslint-disable-next-line import/no-cycle
import { addPost, getPost, observerUser } from '../firebase/functions.js';

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
          <p class='error' id='errorNoPost'></p>
          <div class='buttons_profile'>
            <button class='button btnPost' id='btnPost'>Publicar</button>
            <button class='button btnPost' id='btnCancelPost'>Cancelar</button>
          </div>
        </form>
      </section>
      <hr>
      <section class='section_posts' id='posts'></section>
    </section>
  `;
  FeedDiv.innerHTML = sectionFeed;
  return FeedDiv;
};

export const savePost = () => {
  const postForm = document.getElementById('profile');
  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const txtPost = postForm.textProfile.value;
    const errorPost = document.getElementById('errorNoPost');
    if (txtPost !== '') {
      // }
      const callback = (txt, uid, nameU, dateP) => {
      // console.log(`se ejecutó el callback ${uid}`);
        addPost(txt, uid, nameU, dateP);
      };
      observerUser(callback, txtPost);
      // .then((userPost) => {
      //   console.log(`este es el final${userPost}`);
      // });
      document.getElementsByClassName('textarea_profile')[0].value = '';
    } else {
      errorPost.textContent = 'No has agregado texto a tu publicación';
    }
  });
};

export const showPost = () => {
  getPost()
    .then((postSnapshot) => {
      const sectionPosts = document.getElementById('posts');
      sectionPosts.innerHTML = '';
      postSnapshot.docs.forEach((doc) => {
        console.log(doc);
        console.log(doc.data().userUid);
        // console.log(doc.data().currentUser);
        // console.log(doc.key().segmentos[6]);
        // console.log(doc.auth.currentUser.uid);
        const articlePost = `
          <article class='postUsers'>
            <form action='' method='post' name='feed' id='post'>
              <label id='nameUserPost' for='name' class='name_user'>${doc.data().nameUser}</label>
              <h4 id='textPost' class='textarea_post' name='textarea'>${doc.data().post}</h4>
              <div class='icon_post'>
                <img class='imgLike' src="./IMG/corazonRosa.png" alt="Corazón pintado de rosa">
                <img class='imgLike' src="./IMG/corazon.png" alt="Corazón sin pintar">  
              </div>
              <div class='container_remove'>
                <!--<p class='textRemove'>Eliminar Publicación</p>-->
                <!--<img class='imgRemove' src="./IMG/eliminar.png" alt="Eliminar publicación">-->
              </div>
            </form>
            <hr>
          </article>
        `;
        sectionPosts.innerHTML += articlePost;
      });
    });
};

// const addRemove = () => {
//   if (userUid === currentUser) {
//     const containerRemove = document.getElementById('container_remove');
//     const imgRemove = `
//       <img class='imgRemove' src="./IMG/eliminar.png" alt="Eliminar publicación">
//       `;
//     containerRemove.appendChild = imgRemove;
//   }
// };
