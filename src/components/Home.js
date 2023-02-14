// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

export const Home = () => {
  const HomeDiv = document.createElement('div');
  const sectionHome = `
    <section class='section_home'>
      <div class='img_home'>
        <img src='./IMG/4876586-01.png' alt='Adultos mayores usando tecnología'>
      </div>
      <section class='welcome_home'>
        <header class='title_home'>
          <h1 class="title">SabiOld</h1>
        </header>
        <div class='txt_home'>
            <p class='text_initial'>¡Bienvenidas y bienvenidos a SabiOld. Su red social favorita!</p>
            <p class='text_initial'>Por favor, elige la opción que necesites</p>
        </div>
        <div class='txt_home'>
          <button class='button btnLogin' id='btnLogin'>Iniciar Sesión</button>
          <button class='button btnRegister' id='btnRegister'>Registrarse</button>
        </div>
      </section>
    </section>
    `;

  HomeDiv.innerHTML = sectionHome;

  return HomeDiv;
};

window.addEventListener('DOMContentLoaded', () => {
  const btnLogin = document.getElementById('btnLogin');
  const btnRegister = document.getElementById('btnRegister');
  btnLogin.addEventListener('click', () => onNavigate('/login'));
  btnRegister.addEventListener('click', () => onNavigate('/register'));
});
