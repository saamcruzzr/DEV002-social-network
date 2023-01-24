export const Login = () => {
    const HomeDiv = document.createElement('div');
    HomeDiv.textContent = "Registro"
    const btnLogin = document.createElement('button');

    btnLogin.textContent = 'Regresar a Home';

    HomeDiv.appendChild(btnLogin);

    return HomeDiv;
};