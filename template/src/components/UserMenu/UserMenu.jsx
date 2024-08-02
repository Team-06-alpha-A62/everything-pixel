import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import styles from './UserMenu.module.scss';

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(isOpen => !isOpen);
  };

  const handleClickOutside = event => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mouseDown', handleClickOutside);
  }, []);

  return (
    <div className={styles.userMenu} ref={menuRef}>
      <button className="menu-button" onClick={toggleDropdown}>
        menu
      </button>
      {isOpen && (
        <div className={styles.dropDown}>
          <ul>
            <li>
              <FontAwesomeIcon icon={faUser} /> Profile
            </li>
            <li>
              <FontAwesomeIcon icon={faGear} />
              Settings
            </li>
            <li onClick={handleLogout}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
