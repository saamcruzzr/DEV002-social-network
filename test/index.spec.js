// importamos la funcion que vamos a testear
import { auth, createUserWithEmailAndPassword, registerUser } from '../src/firebase/firebase.js';

jest.mock('../src/firebase/firebase.js', () => ({
  return: {
    auth: jest.fn(() => ({
      return: { auth: 'TEST' },
    })),
    createUserWithEmailAndPassword: jest.fn((auth, email, password) => {
      if (!email || !password) {
        throw new Error('ERROR');
      }
      Promise.resolve({ user: 'admin' });
    }),
  },
  // registerUser: () => Promise.reject({ user: 'carlos' }),
}));

describe('Test for the register function', () => {
  const emailTest = 'admin@test.com';
  const passTest = 'admin123';

  it('Should call createWithEmailAndPassword', () => {
    registerUser(emailTest, passTest);
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });
});

// const getDateInFormatABC = () => "la fecha de hoy es la siguente" + Date.now()
