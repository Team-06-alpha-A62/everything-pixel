import PropTypes from 'prop-types';
import styles from './PostActions.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faCopy,
  faThumbsDown as farThumbsDown,
  faThumbsUp as farThumbsUp,
} from '@fortawesome/free-regular-svg-icons';
import {
  faThumbsDown as fasThumbsDown,
  faThumbsUp as fasThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const PostActions = ({
  id,
  date,
  votes,
  comments,
  userVote,
  handleUserVoteChange,
  isPostDetails,
  edited,
}) => {
  const navigate = useNavigate();

  const copyToClipboard = async url => {
    try {
      await navigator.clipboard.writeText(url);
      alert('URL copied successfully!');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles['post-actions']}>
      <span className={styles['time-created']}>
        {edited ? `edited: ${edited}` : date}
      </span>
      <div
        className={styles['action-buttons']}
        onClick={() => navigate(`/feed/post/${id}`)}
      >
        {!isPostDetails && (
          <>
            {comments}
            <FontAwesomeIcon icon={faComment} />
          </>
        )}
        <div
          onClick={() =>
            copyToClipboard(`${window.location.origin}/feed/post/${id}`)
          }
        >
          <FontAwesomeIcon icon={faCopy} />
        </div>
        <div onClick={() => handleUserVoteChange('upVote')}>
          <FontAwesomeIcon
            icon={userVote === 'upVote' ? fasThumbsUp : farThumbsUp}
          />
          {votes.upVote}
        </div>
        <div onClick={() => handleUserVoteChange('downVote')}>
          {votes.downVote}
          <FontAwesomeIcon
            icon={userVote === 'downVote' ? fasThumbsDown : farThumbsDown}
          />
        </div>
      </div>
    </div>
  );
};

PostActions.propTypes = {
  id: PropTypes.string,
  date: PropTypes.any,
  votes: PropTypes.any,
  comments: PropTypes.number,
  onShowPostCommentsChange: PropTypes.any,
  userVote: PropTypes.any,
  handleUserVoteChange: PropTypes.any,
  isPostDetails: PropTypes.bool,
  edited: PropTypes.any,
};

export default PostActions;
