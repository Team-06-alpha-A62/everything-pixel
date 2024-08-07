import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightFromBracket,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import styles from './UserMenu.module.scss';
import Avatar from 'react-avatar';

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { currentUser, logout } = useAuth();
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
    <div className={styles['user-menu']} ref={menuRef}>
      <button className={styles['menu-button']} onClick={toggleDropdown}>
        <Avatar
          name={`${currentUser.userData?.firstName} ${currentUser.userData?.lastName}`}
          round={true}
          size="50"
          src={currentUser.userData?.avatarUrl}
        />
      </button>
      {isOpen && (
        <div className={styles['drop-down']}>
          <ul>
            <li>
              <Link to="/profile">
                <FontAwesomeIcon icon={faUser} /> Profile
              </Link>
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
