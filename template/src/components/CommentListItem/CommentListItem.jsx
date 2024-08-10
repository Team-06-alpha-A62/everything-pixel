import PropTypes from 'prop-types';
import styles from './CommentListItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const CommentListItem = ({ comment }) => {
  return (
    <div className={styles['comment-item']}>
      <div className={styles['content']}>
        <p>
          <strong>Comment:</strong> {comment.content}
        </p>
        <p>
          <strong>Post:</strong> {comment.post.title}
        </p>
      </div>
      <Link to={`/post/${comment.postId}`}>
        <FontAwesomeIcon icon={faEye} className={styles['eye-icon']} />
      </Link>
    </div>
  );
};

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
    post: PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdOn: PropTypes.string.isRequired,
      edited: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default CommentListItem;
