import PropTypes from 'prop-types';
import styles from './UserListItem.module.scss';
import Avatar from 'react-avatar';
import Button from '../../hoc/Button/Button.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../providers/AuthProvider.jsx';
import {
  changeUserDetails,
  followUser,
  isUserFollowed,
  unfollowUser,
} from '../../services/users.service.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserListItem = ({ user }) => {
  const [hasFollowed, setHasFollowed] = useState(false);
  const { currentUser } = useAuth();
  const { firstName, lastName, avatarUrl, username, isBlocked } = user;
  const [isUserBlocked, setIsUserBlocked] = useState(isBlocked);

  useEffect(() => {
    try {
      const hasFollowedChecker = async () => {
        const hasFollowedResult = await isUserFollowed(
          currentUser.userData.username,
          username
        );
        setHasFollowed(hasFollowedResult);
      };
      hasFollowedChecker();
    } catch (error) {
      console.log(error.message);
    }
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

  const handleToggleUserBlock = async () => {
    if (isUserBlocked) {
      setIsUserBlocked(false);
      await changeUserDetails(username, 'isBlocked', false);
    } else {
      setIsUserBlocked(true);
      await changeUserDetails(username, 'isBlocked', true);
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

        {currentUser.userData?.role === 'admin' && isUserBlocked ? (
          <Button style="alert-secondary" handleClick={handleToggleUserBlock}>
            Unsuspend
          </Button>
        ) : (
          <Button style="alert" handleClick={handleToggleUserBlock}>
            Suspend
          </Button>
        )}
        <Link to={`/profile/users/user/${username}`}>
          <FontAwesomeIcon icon={faEye} className={styles['eye-icon']} />
        </Link>
      </div>
    </div>
  );
};

UserListItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserListItem;
