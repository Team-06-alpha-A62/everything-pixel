import PropTypes from 'prop-types';
import PublishComment from '../PublishComment/PublishComment';
import PostComment from '../PostComment/PostComment';
import { useState } from 'react';

const PostComments = ({
  isBlocked,
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
        isBlocked={isBlocked}
        onPublishComment={onPublishComment}
        onEditComment={handleEditComment}
        commentToEdit={commentToEdit}
        setCommentToEdit={setCommentToEdit}
      />
      {comments.length === 0 ? (
        <p>No comments yet...</p>
      ) : (
        <>
          {sortedComments.map(comment => {
            return (
              <PostComment
                isBlocked={isBlocked}
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
  isBlocked: PropTypes.bool,
  comments: PropTypes.arrayOf(PropTypes.object),
  onPublishComment: PropTypes.func,
  handleEditComment: PropTypes.func,
  handleDeleteComment: PropTypes.func,
};

export default PostComments;
