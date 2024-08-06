import PropTypes from 'prop-types';
import PublishComment from '../PublishComment/PublishComment';
import PostComment from '../PostComment/PostComment';
import { useState } from 'react';

const PostComments = ({
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
        onPublishComment={onPublishComment}
        onEditComment={handleEditComment}
        commentToEdit={commentToEdit}
        setCommentToEdit={setCommentToEdit}
      />
      {comments.length === 0 ? (
        <p>No comments</p>
      ) : (
        <>
          {sortedComments.map(comment => {
            return (
              <PostComment
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
  comments: PropTypes.arrayOf(PropTypes.object),
  onPublishComment: PropTypes.func,
};

export default PostComments;
