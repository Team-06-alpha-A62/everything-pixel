import PropTypes from 'prop-types';
import styles from './PostActions.module.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown as farThumbsDown, faThumbsUp as farThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown as fasThumbsDown, faThumbsUp as fasThumbsUp } from '@fortawesome/free-solid-svg-icons';


const PostActions = ({ date, votes }) => {
  const initialVotesState = {
    upVotes: 0,
    downVotes: 0,
  };

  const [voteState, setVoteState] = useState(initialVotesState);

  useEffect(() => {
    setVoteState({
      ...voteState,
      upVotes: Object.values(votes ?? {}).filter(v => v === 'upVoted').length,
      downVotes: Object.values(votes ?? {}).filter(v => v === 'downVoted').length,
    });
  }, [votes]);

  return (
    <div>
      <span>{new Date(date).toDateString()}</span>
      <div>
        <div>
        <FontAwesomeIcon icon={farThumbsUp} />
          {voteState.upVotes}
        </div>
        <div>
          {voteState.downVotes}
          <FontAwesomeIcon icon={farThumbsDown} />
        </div>
      </div>
    </div>
  );
};

PostActions.propTypes = {
  date: PropTypes.number.isRequired,
  votes: PropTypes.any,
};

export default PostActions;
