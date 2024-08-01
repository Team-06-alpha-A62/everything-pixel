import { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../config/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { loginUser, logoutUser, registerUser } from '../services/auth.service.js';

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
          const data = await getUserData(user.uid);
          const userData = data[Object.keys(data)[0]] || null;
          setCurrentUser({ user, userData });
        } else {
          setCurrentUser(initialState);
        }
      } catch (error) {}
    });
  }, []);

  const login = async (email, password) => {
    try {
      const credentials = await loginUser(email, password);
      setCurrentUser({ user: credentials.user, userData: null });
    } catch (error) {}
  };

  register = async (email, password) => {
    try {
      const userCredentials = await registerUser(email, password);
      const user = userCredentials.user;
      setCurrentUser({ user, userData: null });
    } catch (error) {
      throw new Error(`Registration error: ${error.message}`);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setCurrentUser(credentials.user);
    } catch (error) {
      throw new Error(`Logout error: ${error.message}`);
    }
  };

  values = {
    currentUser,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider values={values}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
