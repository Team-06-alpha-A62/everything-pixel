import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import styles from './UserMenu.module.scss';
import Avatar from 'react-avatar';
import DropDown from '../../hoc/DropDown/DropDown.jsx';

const UserMenu = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <DropDown
      element={
        <Avatar
          name={`${currentUser.userData?.firstName} ${currentUser.userData?.lastName}`}
          round={true}
          size="50"
          src={currentUser.userData?.avatarUrl}
        />
      }
    >
      <div className={styles['drop-down']}>
        <ul>
          <Link to="/profile/general">
            <li>
              <FontAwesomeIcon icon={faUser} /> Profile
            </li>
          </Link>
          {currentUser.userData?.role === 'admin' && (
            <Link to="/profile/general">
              <li>{/* <FontAwesomeIcon icon={} /> Admin area */}</li>
            </Link>
          )}
          <li onClick={handleLogout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log out
          </li>
        </ul>
      </div>
    </DropDown>
  );
};

export default UserMenu;
