export const Register = () => {
    const HomeDiv = document.createElement('div');
    HomeDiv.textContent = "Registro"
    const btnRegister = document.createElement('button');

    btnRegister.textContent = 'Regresar a Home';

    HomeDiv.appendChild(btnRegister);

    return HomeDiv;
};