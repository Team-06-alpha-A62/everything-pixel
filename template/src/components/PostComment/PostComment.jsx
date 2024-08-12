import PropTypes from 'prop-types';
import styles from './PostComment.module.scss';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  getUserByHandle,
  userVoteInteractionWithComment,
} from '../../services/users.service';
import Avatar from 'react-avatar';
import { useAuth } from '../../providers/useAuth.js';
import CommentActions from '../CommentActions/CommentActions';
import {
  getCommentById,
  hasUserVotedComment,
} from '../../services/comments.service';
import {
  faCircleXmark,
  faFlag,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faFlag as faFlagSolid } from '@fortawesome/free-solid-svg-icons'; // Import solid flag icon
import Modal from '../Modal/Modal';
import ReportMenu from '../ReportMenu/ReportMenu';
import commentReportEnum from '../../enums/commentReportEnum';
import { createCommentReport } from '../../services/reports.services';

const PostComment = ({
  comment,
  setCommentToEdit,
  onDeleteComment,
  isEditMode,
}) => {
  const { currentUser } = useAuth();
  const [commentAuthor, setCommentAuthor] = useState({});
  const [userVote, setUserVote] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [hasReported, setHasReported] = useState(false);
  const [commentVotes, setCommentVotes] = useState({ upVote: 0, downVote: 0 });

  useEffect(() => {
    const fetchCommentAuthorData = async () => {
      const commentAuthorData = await getUserByHandle(comment.author);
      setCommentAuthor(commentAuthorData);
    };
    fetchCommentAuthorData();
  }, [comment.author]);

  useEffect(() => {
    if (comment.reports && comment.reports[currentUser.userData.username]) {
      setHasReported(true);
    }
  }, [comment, currentUser?.userData?.username]);

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

  const handleEditModeChange = async () => {
    if (!isEditMode) {
      const { id, content } = await getCommentById(comment.id);
      setCommentToEdit({
        id,
        content,
      });
    } else {
      setCommentToEdit({
        id: null,
        content: '',
      });
    }
  };

  const handleReportClick = async reportType => {
    try {
      await createCommentReport(
        comment.id,
        reportType,
        currentUser.userData.username
      );
      setIsReportModalOpen(false);
      setHasReported(true);
    } catch (error) {
      alert(`Failed to report: ${error.message}`);
    }
  };

  const timeAgo = formatDistanceToNow(new Date(comment.createdOn), {
    addSuffix: true,
  });

  return (
    <div className={styles['comment-container']}>
      <Avatar
        name={`${commentAuthor.firstName} ${commentAuthor.lastName}`}
        round={true}
        size="50"
        src={commentAuthor.avatarUrl}
        className={styles['comment-avatar']}
      />
      <div className={styles['comment-details-container']}>
        <div>
          <span className={styles['comment-username']}>
            <strong>{commentAuthor.username}</strong>
          </span>
          <span className={styles['comment-time']}>{timeAgo} {comment.edited && ` • Edited`}</span>
        </div>
        <pre className={styles['comment-content']}>{comment.content}</pre>
        <div className={styles['comment-actions']}>
          <CommentActions
            votes={commentVotes}
            userVote={userVote}
            handleUserVoteChange={handleUserVoteChange}
          />
        </div>
      </div>
      {comment.isUserComment ? (
        <div className={styles['comment-controllers']}>
          {isEditMode ? (
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={styles['undo-edit-comment']}
              onClick={handleEditModeChange}
            />
          ) : (
            <FontAwesomeIcon
              onClick={handleEditModeChange}
              icon={faPen}
              className={styles['edit-comment']}
            />
          )}

          <FontAwesomeIcon
            onClick={() => onDeleteComment(comment.id)}
            icon={faTrashCan}
            className={styles['delete-comment']}
          />
        </div>
      ) : hasReported ? (
        <FontAwesomeIcon
          icon={faFlagSolid}
          className={styles['reported-flag']}
        />
      ) : (
        <FontAwesomeIcon
          icon={faFlag}
          onClick={() => setIsReportModalOpen(true)}
        />
      )}
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      >
        <ReportMenu
          reportOptions={commentReportEnum}
          handleReportClick={handleReportClick}
        />
      </Modal>
    </div>
  );
};

PostComment.propTypes = {
  comment: PropTypes.object.isRequired,
  setCommentToEdit: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
};

export default PostComment;
