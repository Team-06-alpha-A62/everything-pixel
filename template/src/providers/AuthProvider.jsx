import { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../config/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
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

const AuthContext = createContext({
  currentUser: initialState,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(initialState);

  useEffect(() => {
    return onAuthStateChanged(auth, async user => {
      try {
        if (user) {
          const userData = await getUserData(user.uid);
          setCurrentUser({ user, userData: userData || null });
        } else {
          setCurrentUser(initialState);
        }
      } catch (error) {
        throw new Error('Auth state change went wrong');
      }
    });
  }, []);

  const login = async (email, password) => {
    try {
      const credentials = await loginUser(email, password);
      setCurrentUser({ user: credentials.user, userData: null });
    } catch (error) {
      throw new Error(`Something went wrong logging in: ${error.message}`);
    }
  };

  const register = async (username, firstName, lastName, email, password) => {
    try {
      const { user } = await registerUser(email, password);
      const { uid } = user;
      await createUser(username, uid, email, firstName, lastName);
      setCurrentUser({ user, userData: null });
    } catch (error) {
      throw new Error(`Registration error: ${error.message}`);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setCurrentUser(initialState);
    } catch (error) {
      throw new Error(`Logout error: ${error.message}`);
    }
  };

  const values = {
    currentUser,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
}

AuthProvider.propTypes = {
  children: PropTypes.any,
};
