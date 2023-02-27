import {
  auth, doc, getDoc, db,
} from '../firebase/firebase.js';
// eslint-disable-next-line import/no-cycle
import {
  addPost, getPost, observerUser, edPost, deletePost, darLike, quitarLike,
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
  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const txtPost = postForm.textProfile.value;
    const errorPost = document.getElementById('errorNoPost');
    if (txtPost !== '') {
      const callback = (txt, uid, nameU, dateP) => {
        addPost(txt, uid, nameU, dateP);
      };
      observerUser(callback, txtPost);
      document.getElementsByClassName('textarea_profile')[0].value = '';
    } else {
      errorPost.textContent = 'No has agregado texto a tu publicación';
    }
  });
};

export const showPost = () => {
  getPost()
    .then((postSnapshot) => {
      // console.log(postSnapshot);
      const sectionPosts = document.getElementById('posts');
      sectionPosts.innerHTML = '';
      const userLoginFirebase = auth.currentUser.uid;
      postSnapshot.docs.forEach((docu) => {
        const userPost = docu.data().userUid;
        if (userLoginFirebase === userPost) {
          const articlePost = `
            <article class='postUsers'>
              <div name='feed' id=${docu.id}>
                <label id='nameUserPost' for='name' class='name_user'>${docu.data().nameUser}</label>
                <button type='button' id=${'ed'}${docu.id} class='btn_edit'>
                  <img class='imgEdit' src='./IMG/boligrafo.png' alt='Lápiz de edición'>
                </button>
                <h4 id=${'h4'}${docu.id} class='textarea_post' name='textarea'>${docu.data().post}</h4>
                <div class='likear' id=${docu.id}>
                  <img class='imgLikeRosa' src='./IMG/corazonRosa.png' alt='Corazón pintado de rosa'>
                  <img class ='imgLikeVacio' src='./IMG/corazon.png' alt='Corazón sin pintar'></img>
                  <span id=${'c'}${docu.id}>0</span>
                </div>
                <div class='container_remove'>
                  <!--<p class='textRemove'>Eliminar Publicación</p>-->
                  <button class='btn_remove' id=${'de'}${docu.id}>
                    <img class='imgRemove' src="./IMG/eliminar.png" alt="Eliminar publicación">
                  </button>
                </div>
              </div>
              
              <hr>
            </article>
          `;
          sectionPosts.innerHTML += articlePost;
        } else {
          const articlePost = `
          <article class='postUsers'>
            <div name='feed' id='post'>
              <label id='nameUserPost' for='name' class='name_user'>${docu.data().nameUser}</label>
              <h4 id='textPost' class='textarea_post' name='textarea'>${docu.data().post}</h4>
              <div class='likear' id=${docu.id}>
                <img class='imgLikeRosa' src='./IMG/corazonRosa.png' alt='Corazón pintado de rosa'>
                <img class ='imgLikeVacio' src='./IMG/corazon.png' alt='Corazón sin pintar'></img>
                <span id=${'c'}${docu.id}>0</span>
              </div>
            </div>
            <hr>
          </article>
        `;
          sectionPosts.innerHTML += articlePost;
        }
      });

      // DELETE

      const btnRemove = sectionPosts.querySelectorAll('.btn_remove');
      btnRemove.forEach((btn) => {
        btn.addEventListener('click', () => {
          const confirmRemove = window.confirm('¿Realmente deseas borrar este post?');
          if (confirmRemove === true) {
          // console.log(btn.id);
            deletePost(btn.id)
              .then(() => { showPost(); });
          } else {
            console.log('no se borra nada');
          }
        });
      });

      // EDIT

      const btnEdit = sectionPosts.querySelectorAll('.btn_edit');
      const h4Text = sectionPosts.querySelectorAll('.textarea_post');
      btnEdit.forEach((btnE) => {
        h4Text.forEach((h4T) => {
          const idH4 = h4T.id;
          const idBtn = btnE.id;
          btnE.addEventListener('click', (e) => {
            if (idH4.slice(2) === idBtn.slice(2)) {
              // console.log(textToEdit);
              const textToEdit = h4T.innerHTML;
              let editPost = prompt('inserte nuevo texto', textToEdit);
              if (editPost === null) {
                editPost = textToEdit;
              }
              const idPost = e.target.parentElement.parentElement.id;
              console.log(editPost);
              edPost(idPost, editPost);
              showPost();
            }
          });
        });
      });

      // LIKE

      // si le dan click al div, y el array likes estaba vacío
      // se cambia a corazón pintado
      // y se agrega elem uid al array
      const likePost = sectionPosts.querySelectorAll('.likear');
      likePost.forEach((btnLike) => {
        btnLike.addEventListener('click', async () => {
          const userUidLike = auth.currentUser.uid;
          // const x = doc.data().userUid;
          // const x = db.doc;
          // console.log(userUidLike);
          // console.log(`AQUI ${x}`);
          // console.log(btnLike.id);
          // if () {
          // si en totalLikes existe userUidLike se ejecuta quitarLike
          // quitarLike(userUidLike, btnLike.id);
          // si en totalLikes NO existe userUidLike se ejecuta darLike
          // darLike(userUidLike, btnLike.id);
          // console.log(btnLike.id);
          const docRef = doc(db, 'Posts', btnLike.id);
          const docSnap = await getDoc(docRef);
          // console.log(docRef);
          // console.log(`${'docSnap: '}${docSnap}`);
          // console.log(docSnap.exists());
          // console.log(docSnap.data());
          // console.log(userUidLike);
          if (docSnap.exists()) {
            // console.log('Document data:', docSnap.data().totalLikes);
            // console.log(docSnap.data().totalLikes.includes(userUidLike));
            if (docSnap.data().totalLikes.includes(userUidLike)) {
              quitarLike(userUidLike, btnLike.id)
                .then(() => {
                  // console.log('Document data:', docSnap.data().totalLikes.length);
                  const numero = document.getElementById(`${'c'}${btnLike.id}`);
                  // console.log(numero);
                  numero.innerHTML = docSnap.data().totalLikes.length;
                });
              // .then((result) => console.log(result));
            } else {
              darLike(userUidLike, btnLike.id)
                // .then(() => console.log('Document data:', docSnap.data().totalLikes.length));
                // .then((result) => console.log(result));
                .then(() => {
                  // console.log('Document data:', docSnap.data().totalLikes.length);
                  const numero = document.getElementById(`${'c'}${btnLike.id}`);
                  // console.log(numero);
                  numero.innerHTML = docSnap.data().totalLikes.length;
                });
            }
            // console.log('Document data:', docSnap.data().totalLikes);
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        });
      });

      // si le dan click al div, y el array likes contiene elem uid
      // se cambia a corazón vacío y se quita elem al array

      // sino le dan click, se queda el corazón vacío y no hace nada más....
      // (no se si va afuera en un if englobando al addEL o ya no se pone)
    });
};

// FER

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
