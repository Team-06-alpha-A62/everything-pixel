import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Switch from 'react-switch';
import { useDarkMode } from '../../providers/useDarkMode.js';

const ToggleTheme = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleToggle = () => {
    console.log(isDarkMode);
    toggleDarkMode(value => !value);
  };

  const iconStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    paddingLeft: 6,
  };

  return (
    <Switch
      onChange={handleToggle}
      checked={isDarkMode}
      onColor="#4f46e5"
      offColor="#4f46e5"
      uncheckedIcon={<FontAwesomeIcon icon={faSun} style={{...iconStyles, color: '#FFF'}} />}
      checkedIcon={<FontAwesomeIcon icon={faMoon} style={{...iconStyles, color: '#FFF'}} />}
    />
  );
};

export default ToggleTheme;
