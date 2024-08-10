import PropTypes from 'prop-types';
import styles from './UserListItem.module.scss';
import Avatar from 'react-avatar';
import Button from '../../hoc/Button/Button.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../providers/AuthProvider.jsx';
import {
  followUser,
  isUserFollowed,
  unfollowUser,
} from '../../services/users.service.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserListItem = ({ user, handleClick }) => {
  const [hasFollowed, setHasFollowed] = useState(false);
  const { currentUser } = useAuth();
  const { firstName, lastName, avatarUrl, username, isBlocked } = user;

  useEffect(() => {
    const hasFollowedChecker = async () => {
      const hasFollowedResult = await isUserFollowed(
        currentUser.userData.username,
        username
      );
      setHasFollowed(hasFollowedResult);
    };
    hasFollowedChecker();
  }, [currentUser?.userData?.username, username]);

  const handleFollowToggle = async () => {
    if (hasFollowed) {
      await unfollowUser(currentUser.userData.username, username);
      setHasFollowed(false);
    } else {
      await followUser(currentUser.userData.username, username);
      setHasFollowed(true);
    }
  };
  return (
    <div className={styles['user-item']}>
      <div className={styles['user-info']}>
        <Avatar
          name={`${firstName} ${lastName}`}
          round={true}
          size="50"
          src={avatarUrl}
        />
        <span>{username}</span>
      </div>
      <div className={styles['user-controllers']}>
        {hasFollowed ? (
          <Button style="secondary" handleClick={handleFollowToggle}>
            Unfollow
          </Button>
        ) : (
          <Button style="primary" handleClick={handleFollowToggle}>
            Follow
          </Button>
        )}

        {currentUser.userData?.role === 'admin' && isBlocked ? (
          <Button style="alert-secondary" handleClick={handleClick}>
            Unsuspend
          </Button>
        ) : (
          <Button style="alert" handleClick={handleClick}>
            Suspend
          </Button>
        )}
        <Link handleClick={handleClick} to={`/profile/users/user/${username}`}>
          <FontAwesomeIcon icon={faEye} className={styles['eye-icon']} />
        </Link>
      </div>
    </div>
  );
};

UserListItem.propTypes = {
  user: PropTypes.object.isRequired,
  handleClick: PropTypes.func,
};

export default UserListItem;
