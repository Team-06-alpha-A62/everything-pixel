import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Switch from 'react-switch';

const ToggleTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(value => !value);
  };

  const iconStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
    color: "#FFF",
    paddingLeft: 6,
  }

  return (
    <Switch
      onChange={handleToggle}
      checked={isDarkMode}
      onColor="#374151"
      offColor="#4f46e5"
      uncheckedIcon={<FontAwesomeIcon icon={faSun} style={iconStyles}/>}
      checkedIcon={<FontAwesomeIcon icon={faMoon} style={iconStyles}/>}
    />
  );
};

export default ToggleTheme;
