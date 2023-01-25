import { onNavigate } from "../main.js";

export const Register = () => {
    // HomeDiv o RegisterDiv????
    const HomeDiv = document.createElement('div');
    HomeDiv.textContent = 'Registro';
    const sectionRegister = `
    <h3 class="title_login">Formulario</h3>
    <section class="section_login">
        <p class="text_login">Nombre Completo</p>
        <input type="text" class="input_login">
        <p class="text_login">Fecha de Nacimiento</p>
        <input type="text" class="input_login">
        <p class="text_login">Correo Electrónico</p>
        <input type="text" class="input_login">
        <p class="text_login">Contraseña</p>
        <input type="text" class="input_login">
        <p class="text_login">Confirmar Contraseña</p>
        <input type="text" class="input_login">
    </section>
    `;


    const btnFeed = document.createElement('button');
    btnFeed.setAttribute("class", "button btnFeed");

    HomeDiv.innerHTML = sectionRegister;
    btnFeed.textContent = 'Guardar Datos';

    btnFeed.addEventListener('click', () => onNavigate('/feed'));

    HomeDiv.appendChild(btnFeed);

    return HomeDiv;
};