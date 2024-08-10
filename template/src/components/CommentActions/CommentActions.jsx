import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsDown as farThumbsDown,
  faThumbsUp as farThumbsUp,
} from '@fortawesome/free-regular-svg-icons';
import {
  faThumbsDown as fasThumbsDown,
  faThumbsUp as fasThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

import styles from './CommentActions.module.scss';

const CommentActions = ({ votes, userVote, handleUserVoteChange }) => {
  return (
    <div className={styles['comment-actions']}>
      <div className={styles['action-buttons']}>
        <div onClick={() => handleUserVoteChange('upVote')}>
          <span>{votes.upVote}</span>
          <FontAwesomeIcon
            icon={userVote === 'upVote' ? fasThumbsUp : farThumbsUp}
            className={styles['action-icon']}
          />
        </div>
        <div onClick={() => handleUserVoteChange('downVote')}>
          <span>{votes.downVote}</span>
          <FontAwesomeIcon
            icon={userVote === 'downVote' ? fasThumbsDown : farThumbsDown}
            className={styles['action-icon']}
          />
        </div>
      </div>
    </div>
  );
};

CommentActions.propTypes = {
  votes: PropTypes.any,
  userVote: PropTypes.any,
  handleUserVoteChange: PropTypes.any,
};

export default CommentActions;
