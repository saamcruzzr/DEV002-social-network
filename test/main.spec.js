/* eslint-disable import/no-unresolved */
import { loginUser, registerUser } from '../src/firebase/functions.js';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../src/firebase/firebase.js';

// TESTEO FUNCION ASINCRONA

jest.mock('../src/firebase/firebase.js', () => ({
  auth: jest.fn(() => ({ auth: 'TEST' })),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signInWithPopup: jest.fn(),
  GoogleAuthProvider: jest.fn(),
  addUser: jest.fn(),
}));

const email = 'admin@test.com';
const pass = 'admin123';

describe('Test para la función de registerUser', () => {
  it('registerUser es function?', () => {
    expect(typeof registerUser).toBe('function');
  });
  it('debería llamar a la función createUserWithEmailAndPassword', async () => {
    await registerUser(email, pass);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, pass);
  });
});

describe('Test para la función de loginUser', () => {
  it('loginUser es function?', () => {
    expect(typeof loginUser).toBe('function');
  });
  it('debería llamar a la función signInWithEmailAndPassword', async () => {
    await loginUser(email, pass);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, pass);
  });
});
