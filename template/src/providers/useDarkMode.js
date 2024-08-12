import { useContext } from 'react';
import { DarkModeContext } from './DarkModeProvider.jsx';

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);

  if (!context)
    throw new Error('DarkModeContext was used outside of DarkModeProvider');

  return context;
};
