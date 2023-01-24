import { home } from './lib/components/home.js';
import { register } from './lib/components/register.js';
import { logIn } from './lib/components/login.js';

const rootDiv = document.getElementById('root');

const routes = {
    '/': home,
    '/register': register,
    '/login': logIn,
};

export const onNavigate = (pathname) => {
    window.history.pushState(
        {},
        pathname,
        window.location.origin + pathname,
    );

    while (rootDiv.firstChild) {
        rootDiv.removeChild(rootDiv.firstChild);
    };

    rootDiv.appendChild(routes[pathname]())
};

const component = routes[window.location.pathname];

rootDiv.appendChild(component());