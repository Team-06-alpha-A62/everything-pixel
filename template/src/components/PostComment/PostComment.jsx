import PropTypes from 'prop-types';
import styles from './PostComment.module.scss';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  getUserByHandle,
  userVoteInteractionWithComment,
} from '../../services/users.service';
import Avatar from 'react-avatar';
import { useAuth } from '../../providers/AuthProvider';
import CommentActions from '../CommentActions/CommentActions';
import { hasUserVotedComment } from '../../services/comments.service';

const PostComment = ({ comment }) => {
  const { currentUser } = useAuth();
  const [commentAuthor, setCommentAuthor] = useState({});
  const [userVote, setUserVote] = useState(null);
  const [commentVotes, setCommentVotes] = useState({ upVote: 0, downVote: 0 });

  useEffect(() => {
    const fetchCommentAuthorData = async () => {
      const commentAuthorData = await getUserByHandle(comment.author);
      setCommentAuthor(commentAuthorData);
    };
    fetchCommentAuthorData();
  }, []);

  useEffect(() => {
    if (!currentUser?.userData?.username) return;
    const fetchVoteData = async () => {
      const result = await hasUserVotedComment(
        currentUser.userData.username,
        comment.id
      );
      setUserVote(result);
    };
    fetchVoteData();
  }, [currentUser, comment.id]);

  useEffect(() => {
    const updatedcommentVotes = {
      upVote: Object.values(comment.votes || {}).filter(
        vote => vote === 'upVote'
      ).length,
      downVote: Object.values(comment.votes || {}).filter(
        vote => vote === 'downVote'
      ).length,
    };
    setCommentVotes(updatedcommentVotes);
  }, [comment.votes]);

  const handleUserVoteChange = async type => {
    try {
      let updatedVotes = { ...commentVotes };
      if (userVote === type) {
        await userVoteInteractionWithComment(
          null,
          comment.id,
          currentUser.userData.username
        );
        setUserVote(null);
        updatedVotes[type] -= 1;
      } else {
        if (userVote) {
          updatedVotes[userVote] -= 1;
        }
        await userVoteInteractionWithComment(
          type,
          comment.id,
          currentUser.userData.username
        );
        setUserVote(type);
        updatedVotes[type] += 1;
      }
      setCommentVotes(updatedVotes);
    } catch (error) {
      alert(error.message);
    }
  };

  const timeAgo = formatDistanceToNow(new Date(comment.createdOn), {
    addSuffix: true,
  });

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
        <span className={styles.commentUsername}>
          <strong>{commentAuthor.username}</strong>
        </span>
        <span className={styles.timeCreated}>{timeAgo}</span>
        <span className={styles.commentContent}>{comment.content}</span>
        <div className={styles.commentActions}>
          <CommentActions
            votes={commentVotes}
            userVote={userVote}
            handleUserVoteChange={handleUserVoteChange}
          />
        </div>
      </div>
    </div>
  );
};

PostComment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default PostComment;
