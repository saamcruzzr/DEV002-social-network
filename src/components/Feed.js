// PARA QUE NO ME LO BORRE EN FEED BRANCH
// eslint-disable-next-line import/no-cycle
// import { onNavigate } from '../main.js';
// import { async } from 'regenerator-runtime';
import { auth } from '../firebase/firebase.js';
// eslint-disable-next-line import/no-cycle
import {
  addPost, getPost, observerUser, edPost,
} from '../firebase/functions.js';

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
  // console.log('aqui mismito');
  // if (postForm) {
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

// // Paso a paso

// // Contar con el boton que se necesita para editar (Lapicito)
// const editForm = document.getElementById('edit_button');
// // Lograr que se active al ser clickeado, mediante un addEventListener
// editForm.addEventListener('click', (e) => {
//   e.preventDefault();
//   console.log(e);
// // Que al ser clickeado el boton muestre una ventana con las opciones de aceptar y cancelar
//   // const chanPost = window.confirm('¿Deseas editar esta publicacion?');
//   // Que al dar click en aceptar muestre el post elegido para ser editado en un
//   // formato que permita la manipulación de este

//   // Que en esta misma instacia permita guardar la edición mediante un botón

//   // Que se muestre en el feed el post editado
// });

export const showPost = () => {
  getPost()
    .then((postSnapshot) => {
      // console.log(postSnapshot);
      const sectionPosts = document.getElementById('posts');
      sectionPosts.innerHTML = '';
      const userLoginFirebase = auth.currentUser.uid;
      // console.log(auth);
      postSnapshot.docs.forEach((doc) => {
        const userPost = doc.data().userUid;
        console.log(doc.data().post);
        if (userLoginFirebase === userPost) {
          const articlePost = `
            <article class='postUsers'>
              <div name='feed' id=${doc.id}>
                <label id='nameUserPost' for='name' class='name_user'>${doc.data().nameUser}</label>
                <button type='button' class='btn_edit'>
                  <img class='imgEdit' src='./IMG/boligrafo.png' alt='Lápiz de edición'>
                </button>
                <h4 id='textPost' class='textarea_post' name='textarea'>${doc.data().post}</h4>
                <div class='icon_post'>
                  <img class='imgLike' src="./IMG/corazonRosa.png" alt="Corazón pintado de rosa">
                  <img class='imgLike' src="./IMG/corazon.png" alt="Corazón sin pintar">
                </div>
                <div class='container_remove'>
                  <!--<p class='textRemove'>Eliminar Publicación</p>-->
                  <button class='btn_remove'>
                    <img class='imgRemove' src="./IMG/eliminar.png" alt="Eliminar publicación">
                  </button>
                </div>
              </div>
              
              <hr>
            </article>
          `;
          sectionPosts.innerHTML += articlePost;
        //   const btnRemove = sectionPosts.querySelector(`#${doc.id}`);
        //   btnRemove.addEventListener('click', () => {
        //     console.log('acaaaaa')
        // })
        //   console.log(btnRemove);
        } else {
          const articlePost = `
          <article class='postUsers'>
            <div name='feed' id='post'>
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
            </div>
            <hr>
          </article>
        `;
          sectionPosts.innerHTML += articlePost;
        }
        // removePost(doc.id);
      });
      const btnRemove = sectionPosts.querySelectorAll('.btn_remove');
      btnRemove.forEach((btn) => {
        btn.addEventListener('click', () => { console.log(btn.id); });
      });
      // console.log(btnRemove);
      // Paso a paso

      // Contar con el boton que se necesita para editar (Lapicito)
      // Lograr que se active al ser clickeado, mediante un addEventListener
      const btnEdit = sectionPosts.querySelectorAll('.btn_edit');
      btnEdit.forEach((btnE) => {
        btnE.addEventListener('click', (e) => {
          console.log(e);
          console.log(e.target.parentElement.parentElement.id);
          console.log(btnE.id);
          const idPost = e.target.parentElement.parentElement.id;
          // let editPost = doc.data().post;
          edPost(idPost);
        });
      });

      // textarea 'textProfile'

      // e.preventDefault();
      // console.log(e);
      // Que al ser clickeado el boton muestre una ventana con las opciones de aceptar y cancelar
      // const chanPost = window.confirm('¿Deseas editar esta publicacion?');
      // Que al dar click en aceptar muestre el post elegido para ser editado en un
      // formato que permita la manipulación de este

      // Que en esta misma instacia permita guardar la edición mediante un botón

      // Que se muestre en el feed el post editado
      // });
    });
};

// export const removePost = (idPost) => {
//   deletePost(idPost)
//     .then((deleteDocs) => {
//       const btnRemove = document.getElementById(idPost);
//       btnRemove.addEventListener('click', () => {
//         deleteDocs.docs.forEach((doc)=>{
//           const idPost = doc.id;

//         });
//       });
//     });
// };

// export const removePost = () => {
// const btnRemove = document.querySelectorAll('.btn_remove');
// btnRemove.addEventListener('click', console.log('hola estoy probando'));
