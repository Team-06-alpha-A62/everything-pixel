import PropTypes from 'prop-types';
import styles from './PostComment.module.scss';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { getUserByHandle } from '../../services/users.service';
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import {
  dislikeComment,
  hasUserLikedComment,
  likeComment,
} from '../../services/comments.service';
import { useAuth } from '../../providers/AuthProvider';

const PostComment = ({ comment }) => {
  const { currentUser } = useAuth();
  const [commentAuthor, setCommentAuthor] = useState({});
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchCommentAuthorData = async () => {
      const commentAuthorData = await getUserByHandle(comment.author);
      setCommentAuthor(commentAuthorData);
    };
    fetchCommentAuthorData();
  });

  useEffect(() => {
    if (!currentUser?.userData?.username) return;
    const hasLikedComment = async () => {
      const userLikedCommentResult = await hasUserLikedComment(
        comment.id,
        currentUser.userData.username
      );
      setIsLiked(userLikedCommentResult);
    };
    hasLikedComment();
  }, [currentUser.userData.username, comment.id]);

  const timeAgo = formatDistanceToNow(new Date(comment.createdOn), {
    addSuffix: true,
  });

  const toggleLike = async () => {
    if (isLiked) {
      console.log(currentUser.userData.username);
      await dislikeComment(currentUser.userData.username, comment.id);
    } else {
      await likeComment(currentUser.userData.username, comment.id);
    }
    setIsLiked(isLiked => !isLiked);
  };

  return (
    <div className={styles.commentContainer}>
      <Avatar
        name={`${commentAuthor.firstName} ${commentAuthor.lastName}`}
        round={true}
        size="32"
        src={commentAuthor.avatarUrl}
        className={styles.commentAvatar}
      />
      <div className={styles.commentDetailsContainer}>
        <span className={styles.commentContent}>
          <strong>{commentAuthor.username}</strong> {comment.content}
        </span>
        <span className={styles.commentTime}>{timeAgo}</span>
      </div>
      <div className={styles.commentActions} onClick={toggleLike}>
        {isLiked ? (
          <FontAwesomeIcon icon={faSolidHeart} />
        ) : (
          <FontAwesomeIcon icon={faRegularHeart} />
        )}
      </div>
    </div>
  );
};

PostComment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default PostComment;
