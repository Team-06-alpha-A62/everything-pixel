import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const PublishComment = ({
  onPublishComment,
  commentToEdit,
  onEditComment,
  setCommentToEdit,
}) => {
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (commentToEdit) {
      setNewComment(commentToEdit.content);
    }
  }, [commentToEdit]);

  const handleNewCommentChange = e => {
    setNewComment(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      if (commentToEdit.id) {
        console.log('edit comment');
        onEditComment(commentToEdit.id, newComment);
        setCommentToEdit({ id: null, content: '' });
      } else {
        console.log('posts comment');
        onPublishComment(newComment);
      }
      setNewComment('');
    }
  };

  return (
    <input
      type="text"
      value={newComment}
      onChange={handleNewCommentChange}
      onKeyDown={handleKeyDown}
    />
  );
};

PublishComment.propTypes = {
  onPublishComment: PropTypes.func,
};

export default PublishComment;
