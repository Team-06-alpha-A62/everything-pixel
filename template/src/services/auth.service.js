import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
} from 'firebase/auth';
import { auth } from '../config/firebase.config.js';

/**
 * Registers a new user using email and password.
 *
 * @param {string} email - The email address of the user to register.
 * @param {string} password - The password for the new user account.
 * @returns {Promise<import('firebase/auth').UserCredential>} A promise that resolves to the user credential object upon successful registration.
 * @throws {Error} If there is an error during the registration process, such as an invalid email or weak password.
 */
export const registerUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

/**
 * Logs in a user using email and password.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user account.
 * @returns {Promise<import('firebase/auth').UserCredential>} A promise that resolves to the user credential object upon successful login.
 * @throws {Error} If there is an error during the login process, such as incorrect credentials or user not found.
 */
export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

/**
 * Logs out the currently authenticated user.
 *
 * @returns {Promise<void>} A promise that resolves when the user is successfully logged out.
 * @throws {Error} If there is an error during the logout process.
 */
export const logoutUser = () => signOut(auth);

export const updateUserEmail = async newEmail => {
  const user = auth.currentUser;

  try {
    await updateEmail(user, newEmail);
  } catch (error) {
    throw new Error(`Error updating email: ${error.message}`);
  }
};
