/* eslint-disable import/no-unresolved */
import {
  registerUser,
  addUser,
  registerGoogle,
  loginUser,
} from '../src/firebase/functions.js';
import {
  auth,
  createUserWithEmailAndPassword,
  // addDoc,
  // collection,
} from '../src/firebase/firebase.js';

// TESTEO FUNCION ASINCRONA

jest.mock('../src/firebase/firebase.js', () => ({
  auth: jest.fn(() => ({ auth: 'TEST' })),
  createUserWithEmailAndPassword: jest.fn((authen, email, pass) => {
    if (!email || !pass) {
      throw new Error('ERROR');
    }
    Promise.resolve({ user: 'admin' });
  }),
  // db: jest.fn(() => ({ db: 'Users' })),
  // addDoc: jest.fn(((collection(db, 'Users'), user))),
}));

describe('Test para la función de registerUser', () => {
  const email = 'admin@test.com';
  const pass = 'admin123';

  // it('registerUser es function?', () => {
  //   expect(typeof registerUser).toBe('function');
  // });
  it('registerUser debería ser una función', () => {
    expect(typeof registerUser).toBe('function');
  });
  it('debería llamar a la función createUserWithEmailAndPassword', async () => {
    await registerUser(email, pass);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, pass);
  });
});

describe('Test para la función de addUser', () => {
  // const user = {
  //   authUid: '',
  //   name: '',
  //   email: '',
  // };
  it('addUser debería ser una función', () => {
    expect(typeof addUser).toBe('function');
  });
  // it('debería llamar a la función addDoc', async () => {
  //   await addUser(user);
  //   expect(addDoc).toHaveBeenCalledWith((collection(db, 'Users'), user));
  // });
});

describe('Test para la función de registerGoogle', () => {
  it('registerGoogle debería ser una función', () => {
    expect(typeof registerGoogle).toBe('function');
  });
});

describe('Test para la función de loginUser', () => {
  it('loginUser debería ser una función', () => {
    expect(typeof loginUser).toBe('function');
  });
});
