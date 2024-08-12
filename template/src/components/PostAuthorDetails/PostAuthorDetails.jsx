import PropTypes from 'prop-types';
import styles from './PostAuthorDetails.module.scss';
import Avatar from 'react-avatar';
import { useState, useEffect } from 'react';
import UserHoverCard from '../UserHoverCard/UserHoverCard';

const PostAuthorDetails = ({ author, currentUser, isCurrentUserBlocked }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldShowHoverCard, setShouldShowHoverCard] = useState(false);
  const [isUserPost, setIsUserPost] = useState(false);
  let hoverTimeout = null;

  useEffect(() => {
    if (!currentUser.userData) return;
    setIsUserPost(currentUser.userData.username === author.username);
  }, [currentUser?.userData, author.username]);

  useEffect(() => {
    if (isHovered) {
      setShouldShowHoverCard(true);
    } else {
      const timer = setTimeout(() => {
        setShouldShowHoverCard(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isHovered]);
  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={styles['author-details']}>
      <Avatar
        name={`${author.firstName} ${author.lastName}`}
        round={true}
        size="50"
        src={author.avatarUrl}
      />
      <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {author.username}
      </span>
      {!isUserPost && shouldShowHoverCard && (
        <UserHoverCard
          isCurrentUserBlocked={isCurrentUserBlocked}
          author={author}
          currentUser={currentUser}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </div>
  );
};

PostAuthorDetails.propTypes = {
  isCurrentUserBlocked: PropTypes.bool,
  author: PropTypes.objectOf(PropTypes.any).isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PostAuthorDetails;
