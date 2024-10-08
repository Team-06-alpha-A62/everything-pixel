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
import { faFlag as faFlagSolid } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal/Modal';
import ReportMenu from '../ReportMenu/ReportMenu';
import commentReportEnum from '../../enums/commentReportEnum';
import { createCommentReport } from '../../services/reports.services';
import { createNotification } from '../../services/notification.service.js';

const PostComment = ({
  isCurrentUserBlocked,
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
    const updatedCommentVotes = {
      upVote: Object.values(comment.votes || {}).filter(
        vote => vote === 'upVote'
      ).length,
      downVote: Object.values(comment.votes || {}).filter(
        vote => vote === 'downVote'
      ).length,
    };
    setCommentVotes(updatedCommentVotes);
  }, [comment.votes]);

  const handleUserVoteChange = async type => {
    if (isCurrentUserBlocked) return;

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
    if (isCurrentUserBlocked) return;

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
    if (isCurrentUserBlocked) return;

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

    if (currentUser?.userData?.username) {
      await createNotification(comment.author, {
        type: 'report',
        message: `${currentUser?.userData?.username} reported your comment: ${reportType}`,
        postId: comment.postId,
      });
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
          <span className={styles['comment-time']}>
            {timeAgo} {comment.edited && ` • Edited`}
          </span>
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
            onClick={() => !isCurrentUserBlocked && onDeleteComment(comment.id)}
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
          className={styles['reported-flag']}
          onClick={() => !isCurrentUserBlocked && setIsReportModalOpen(true)}
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
  isCurrentUserBlocked: PropTypes.bool.isRequired,
  comment: PropTypes.object.isRequired,
  setCommentToEdit: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
};

export default PostComment;
