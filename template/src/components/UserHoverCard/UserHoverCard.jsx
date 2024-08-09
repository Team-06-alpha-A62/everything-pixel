import PropTypes from 'prop-types';
import styles from './UserHoverCard.module.scss';
import Avatar from 'react-avatar';
import {
  followUser,
  isUserFollowed,
  unfollowUser,
} from '../../services/users.service';
import { useEffect, useState } from 'react';
import Button from '../../hoc/Button/Button.jsx';

const UserHoverCard = ({ author, onMouseEnter, onMouseLeave, currentUser }) => {
  const [hasFollowed, setHasFollowed] = useState(false);

  useEffect(() => {
    const hasFollowedChecker = async () => {
      const hasFollowedResult = await isUserFollowed(
        currentUser.userData.username,
        author.username
      );
      setHasFollowed(hasFollowedResult);
    };
    hasFollowedChecker();
  }, [currentUser?.userData?.username, author.username]);

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
        <Button
          style={hasFollowed ? 'secondary' : 'primary'}
          handleClick={handleFollowToggle}
        >
          {hasFollowed ? 'Unfollow' : 'Follow'}
        </Button>
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
