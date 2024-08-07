import PropTypes from 'prop-types';
import styles from './UserHoverCard.module.scss';
import Avatar from 'react-avatar';
import { followUser, unfollowUser } from '../../services/users.service';
import { useEffect, useState } from 'react';

const UserHoverCard = ({ author, onMouseEnter, onMouseLeave, currentUser }) => {
  const [hasFollowed, setHasFollowed] = useState(false);

  useEffect(() => {
    setHasFollowed(currentUser.userData.following[author.username]);
  }, [currentUser?.userData?.following, author.username]);

  const handleFollowToggle = async () => {
    if (hasFollowed) {
      await unfollowUser(currentUser.userData.username, author.username);
      setHasFollowed(false);
    } else {
      await followUser(currentUser.userData.username, author.username);
      setHasFollowed(true);
    }
  };

  return (
    <div
      className={`${styles['user-hover-card']} ${styles['visible']}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Avatar
        name={`${author.firstName} ${author.lastName}`}
        round={true}
        size="60"
        src={author.avatarUrl}
      />
      <div className={styles['user-info']}>
        <span className={styles['username']}>{author.username}</span>
        <button
          onClick={handleFollowToggle}
          className={styles['follow-button']}
        >
          {hasFollowed ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  );
};

UserHoverCard.propTypes = {
  author: PropTypes.objectOf(PropTypes.any).isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  currentUser: PropTypes.any,
};

export default UserHoverCard;
