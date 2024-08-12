import PropTypes from 'prop-types';
import PublishComment from '../PublishComment/PublishComment';
import PostComment from '../PostComment/PostComment';
import { useState } from 'react';
import styles from './PostComments.module.scss';

const PostComments = ({
  isCurrentUserBlocked,
  comments,
  onPublishComment,
  handleEditComment,
  handleDeleteComment,
}) => {
  const [commentToEdit, setCommentToEdit] = useState({
    id: null,
    content: '',
  });

  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdOn) - new Date(a.createdOn)
  );
  return (
    <>
      <PublishComment
        isBlocked={isCurrentUserBlocked}
        onPublishComment={onPublishComment}
        onEditComment={handleEditComment}
        commentToEdit={commentToEdit}
        setCommentToEdit={setCommentToEdit}
      />
      {comments.length === 0 ? (
        <p className={styles['no-items-message']}>No comments yet...</p>
      ) : (
        <>
          {sortedComments.map(comment => {
            return (
              <PostComment
                isCurrentUserBlocked={isCurrentUserBlocked}
                key={comment.id}
                comment={comment}
                setCommentToEdit={setCommentToEdit}
                onDeleteComment={handleDeleteComment}
                isEditMode={commentToEdit.id === comment.id}
              />
            );
          })}
        </>
      )}
    </>
  );
};

PostComments.propTypes = {
  isCurrentUserBlocked: PropTypes.bool,
  comments: PropTypes.arrayOf(PropTypes.object),
  onPublishComment: PropTypes.func,
  handleEditComment: PropTypes.func,
  handleDeleteComment: PropTypes.func,
};

export default PostComments;
