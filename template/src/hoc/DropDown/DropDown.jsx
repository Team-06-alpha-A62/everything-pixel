import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import styles from './DropDown.module.scss';

const DropDown = ({ children, element, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleClickOutside = event => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`${styles['dropdown']} ${className}`} ref={menuRef}>
      <button onClick={toggleDropdown} className={styles['dropdown-button']}>
        {element}
      </button>
      {isOpen && <div className={styles['dropdown-content']}>{children}</div>}
    </div>
  );
};

DropDown.propTypes = {
  children: PropTypes.node.isRequired,
  element: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default DropDown;
