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
    const callback = (txt, uid, nameU) => {
      // console.log(`se ejecutó el callback ${uid}`);
      addPost(txt, uid, nameU);
    };
    observerUser(callback, txtPost);
    // .then((userPost) => {
    //   console.log(`este es el final${userPost}`);
    // });
    document.getElementsByClassName('textarea_profile')[0].value = 'Aquí el texto a publicar';
  });
};

export const showPost = () => {
  getPost()
    .then((postSnapshot) => {
      console.log(postSnapshot);
      postSnapshot.docs.forEach((doc) => {
        // // console.log(doc.data().nameUser);
        // const nUser = document.getElementById('nameUserPost');
        // const textPost = document.getElementById('textPost');
        // // nUser.textContent = postList[0].nameUser;
        // nUser.innerHTML += doc.data().nameUser;
        // textPost.textContent += doc.data().post;

        const articlePost = `
          <article class='postUsers'>
            <form action='' method='post' name='feed' id='post'>
              <label id='nameUserPost' for='name' class='name_user'>${doc.data().nameUser}</label>
              <textarea id='textPost' class='textarea_post' name='textarea'>${doc.data().post}</textarea>
              <div class='icon_post'>
                <img class='imgLike' src="./IMG/corazonRosa.png" alt="Corazón pintado de rosa">
                <img class='imgLike' src="./IMG/corazon.png" alt="Corazón sin pintar">  
              </div>
            </form>
          </article>
        `;
        const sectionPosts = document.getElementById('posts');
        sectionPosts.innerHTML += articlePost;
      });
    });
  // .then(() => {
  //   const nameUser = document.getElementById('nameUser').value;
  //   const textPost = document.getElementById('textPost').value;
  //   nameUser.textContent = 'Jess'; // el usuarix del uid;
  //   textPost.textContent = 'en mi cabeza estas'; // el usuarix del uid;
  // });
};

// console.log(Estos son las id del input a puclicar: textPost, nameUser);
