import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../../providers/useAuth.js';
import { Link, useNavigate } from 'react-router-dom';
import styles from './UserMenu.module.scss';
import Avatar from 'react-avatar';
import DropDown from '../../hoc/DropDown/DropDown.jsx';
import animationData from '../../assets/avatar-loading-animation.json';
import Lottie from 'lottie-react';
import { listenToNotifications } from '../../services/notification.service.js';

const UserMenu = () => {
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (currentUser?.userData?.username) {
      const unsubscribe = listenToNotifications(
        currentUser.userData.username,
        notifications => {
          if (notifications) {
            const unreadNotifications = Object.values(notifications).filter(
              notification => !notification.isRead
            );
            setUnreadCount(unreadNotifications.length);
          } else {
            setUnreadCount(0);
          }
        }
      );

      return () => unsubscribe;
    }
  }, [currentUser?.userData?.username]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingAvatar(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DropDown
      element={
        <div className={styles['avatar-wrapper']}>
          {isLoadingAvatar ? (
            <Lottie
              animationData={animationData}
              className={styles['lottie-animation']}
            />
          ) : (
            <>
              <Avatar
                name={`${currentUser.userData?.firstName} ${currentUser.userData?.lastName}`}
                round={true}
                size="50"
                src={currentUser.userData?.avatarUrl}
              />
              <span className={styles['badge']}>{unreadCount}</span>
            </>
          )}
        </div>
      }
    >
      <div className={`${styles['drop-down']} dropdown-content`}>
        <ul>
          <Link to="/profile/general">
            <li>
              <FontAwesomeIcon icon={faUser} /> Profile
            </li>
          </Link>
          <li onClick={handleLogout}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log out
          </li>
        </ul>
      </div>
    </DropDown>
  );
};

export default UserMenu;
