import { auth, createUserWithEmailAndPassword, registerUser } from '../src/firebase/firebase.js';

// TESTEO FUNCION ASINCRONA

jest.mock('../src/firebase/firebase.js', () => {
  return {
    auth: jest.fn(() => {
      return { auth: 'TEST' }
    }),
    createUserWithEmailAndPassword: jest.fn((auth, email, pass) => {
      if (!email || !pass) {
        throw new Error('ERROR');
      }
      Promise.resolve({ user: 'admin' });
    }),
  };
});

describe('Test para la función de registerUser', () => {
  const email = 'admin@test.com';
  const pass = 'admin123';

  // it('registerUser es function?', () => {
  //   expect(typeof registerUser).toBe('function');
  // });
  it('debería llamar a la función createUserWithEmailAndPassword', async () => {
    await registerUser(email, pass);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, pass);
  });
});
