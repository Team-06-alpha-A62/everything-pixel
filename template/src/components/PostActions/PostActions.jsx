import PropTypes from 'prop-types';
import styles from './PostActions.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faCopy,
  faThumbsDown as farThumbsDown,
  faThumbsUp as farThumbsUp,
  faBookmark as faBookmarkRegular,
} from '@fortawesome/free-regular-svg-icons';
import {
  faThumbsDown as fasThumbsDown,
  faThumbsUp as fasThumbsUp,
  faBookmark as faBookmarkSolid,
} from '@fortawesome/free-solid-svg-icons';

const PostActions = ({
  isCurrentUserBlocked,
  openPostDetails,
  id,
  date,
  votes,
  comments,
  userVote,
  isSaved,
  handleUserVoteChange,
  edited,
  handleSavePost,
}) => {
  const copyToClipboard = async url => {
    try {
      await navigator.clipboard.writeText(url);
      alert('URL copied successfully!');
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClick = action => {
    if (isCurrentUserBlocked) return;
    action();
  };

  return (
    <div className={styles['post-actions']}>
      <span className={styles['time-created']}>
        {edited ? `edited: ${edited}` : date}
      </span>
      <div className={styles['action-buttons']}>
        <div onClick={() => handleClick(handleSavePost)}>
          {isSaved ? (
            <FontAwesomeIcon icon={faBookmarkSolid} />
          ) : (
            <FontAwesomeIcon icon={faBookmarkRegular} />
          )}
        </div>
        <div onClick={() => handleClick(openPostDetails)}>
          {comments}
          <FontAwesomeIcon icon={faComment} />
        </div>
        <div
          onClick={() =>
            handleClick(() =>
              copyToClipboard(`${window.location.origin}/post/${id}`)
            )
          }
        >
          <FontAwesomeIcon icon={faCopy} />
        </div>
        <div onClick={() => handleClick(() => handleUserVoteChange('upVote'))}>
          {votes.upVote}
          <FontAwesomeIcon
            icon={userVote === 'upVote' ? fasThumbsUp : farThumbsUp}
          />
        </div>
        <div
          onClick={() => handleClick(() => handleUserVoteChange('downVote'))}
        >
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
  isCurrentUserBlocked: PropTypes.bool.isRequired,
  openPostDetails: PropTypes.func,
  id: PropTypes.string,
  date: PropTypes.string,
  votes: PropTypes.shape({
    upVote: PropTypes.number,
    downVote: PropTypes.number,
  }).isRequired,
  comments: PropTypes.number,
  userVote: PropTypes.oneOf(['upVote', 'downVote', null]),
  handleUserVoteChange: PropTypes.func.isRequired,
  edited: PropTypes.string,
  isSaved: PropTypes.bool.isRequired,
  handleSavePost: PropTypes.func.isRequired,
};

export default PostActions;
