import PropTypes from 'prop-types';
import styles from './CommentListItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
const CommentListItem = ({ comment }) => {
  return (
    <div className={styles['comment-item']}>
      <p>
        <strong>Comment:</strong> {comment.content}
      </p>
      <p>
        <strong>Post:</strong> {comment.postTitle}
      </p>
      <Link handleClick={handleClick} to={`/profile/users/user/${username}`}>
        <FontAwesomeIcon icon={faEye} className={styles['eye-icon']} />
      </Link>
    </div>
  );
};

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired,
    postTitle: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentListItem;
