import { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../config/firebase.config';
// import { onAuthStateChanged } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  loginUser,
  logoutUser,
  registerUser,
} from '../services/auth.service.js';
import { createUser, getUserData } from '../services/users.service.js';
import { PropTypes } from 'prop-types';

const initialState = {
  user: null,
  userData: null,
};

export const AuthContext = createContext({
  currentUser: initialState,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [user, loading, error] = useAuthState(auth);

  if (currentUser.user !== user) {
    setCurrentUser({ ...currentUser, user });
  }

  useEffect(() => {
    if (!user) {
      return;
    }

    setTimeout(() => {
      getUserData(currentUser?.user.uid).then(data => {
        const userData = data[Object.keys(data)[0]];
        setCurrentUser({ ...currentUser, userData });
      });
      setIsLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const credentials = await loginUser(email, password);
      setCurrentUser({ user: credentials.user, userData: null });
    } catch (error) {
      throw new Error(`Something went wrong logging in: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    username,
    firstName,
    lastName,
    email,
    password,
    avatarUrl
  ) => {
    try {
      setIsLoading(true);
      const credential = await registerUser(email, password);
      await createUser(
        username,
        credential.user.uid,
        email,
        firstName,
        lastName,
        avatarUrl
      );
      setCurrentUser({ user: credential.user, userData: null });
    } catch (error) {
      throw new Error(`Registration error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await logoutUser();
      setCurrentUser(initialState);
    } catch (error) {
      throw new Error(`Logout error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const values = {
    currentUser,
    login,
    logout,
    register,
    isLoading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.any,
};
