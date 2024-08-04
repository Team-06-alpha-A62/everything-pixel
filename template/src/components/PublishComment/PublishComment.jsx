import PropTypes from 'prop-types';
import { useState } from 'react';

const PublishComment = ({ onPublishComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleNewCommentChange = e => {
    setNewComment(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      onPublishComment(newComment);
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
