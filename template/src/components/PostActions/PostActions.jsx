import PropTypes from 'prop-types';
import styles from './PostActions.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faThumbsDown as farThumbsDown,
  faThumbsUp as farThumbsUp,
} from '@fortawesome/free-regular-svg-icons';
import {
  faThumbsDown as fasThumbsDown,
  faThumbsUp as fasThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

const PostActions = ({
  date,
  votes,
  onShowPostCommentsChange,
  userVote,
  handleUserVoteChange,
}) => {
  return (
    <div className={styles.postActions}>
      <span>{new Date(date).toDateString()}</span>
      <div className={styles.actionButtons}>
        <div onClick={onShowPostCommentsChange}>
          <FontAwesomeIcon icon={faComment} />
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
  date: PropTypes.any,
  votes: PropTypes.any,
  onShowPostCommentsChange: PropTypes.any,
  userVote: PropTypes.any,
  handleUserVoteChange: PropTypes.any,
};

export default PostActions;