// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

export const Home = () => {
  const HomeDiv = document.createElement('div');
  const msjInicio = `
    <header>
      <div>
        <h1 class="title">SabiOld</h1>
      </div>
    </header>
    <img src='./IMG/4876586-01.png' alt='Adultos mayores usando tecnología'>
    <section class='section_home'>
        <p class='text_initial'>¡Bienvenidas y bienvenidos a SabiOld. Su red social favorita!</p>
        <p class='text_initial'>Por favor, elige la opción que necesites</p>
    </section>
    `;
  const btnLogin = document.createElement('button');
  const btnRegister = document.createElement('button');
  btnLogin.setAttribute('class', 'button btnLogin');
  btnRegister.setAttribute('class', 'button btnRegister');

  HomeDiv.innerHTML = msjInicio;
  btnLogin.textContent = 'Iniciar Sesión';
  btnRegister.textContent = 'Registrarse';

  btnLogin.addEventListener('click', () => onNavigate('/login'));
  btnRegister.addEventListener('click', () => onNavigate('/register'));

  HomeDiv.appendChild(btnLogin);
  HomeDiv.appendChild(btnRegister);

  return HomeDiv;
};

// export const Home = () => {
//   const HomeDiv = document.createElement('div');
//   const sectionHome = `
//     <section class='section_home'>
//       <div class='img_home'>
//         <img src='./IMG/4876586-01.png' alt='Adultos mayores usando tecnología'>
//       </div>
//       <section class='welcome_home'>
//         <header class='title_home'>
//           <h1 class="title">SabiOld</h1>
//         </header>
//         <div class='txt_home'>
// eslint-disable-next-line max-len
//             <p class='text_initial'>¡Bienvenidas y bienvenidos a SabiOld. Su red social favorita!</p>
//             <p class='text_initial'>Por favor, elige la opción que necesites</p>
//         </div>
//         <div class='txt_home'>
//           <button class='button btnLogin' id='btnLogin'>Iniciar Sesión</button>
//           <button class='button btnRegister' id='btnRegister'>Registrarse</button>
//         </div>
//       </section>
//     </section>
//     `;

//   HomeDiv.innerHTML = sectionHome;

//   return HomeDiv;
// };

// window.addEventListener('DOMContentLoaded', () => {
//   const btnLogin = document.getElementById('btnLogin');
//   const btnRegister = document.getElementById('btnRegister');
//   btnLogin.addEventListener('click', () => onNavigate('/login'));
//   btnRegister.addEventListener('click', () => onNavigate('/register'));
// });
