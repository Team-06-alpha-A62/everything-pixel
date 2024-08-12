import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styles from './PublishComment.module.scss';
import Button from '../../hoc/Button/Button.jsx';

const PublishComment = ({
  isBlocked,
  onPublishComment,
  commentToEdit,
  onEditComment,
  setCommentToEdit,
}) => {
  const [newComment, setNewComment] = useState('');
  //console.log(isBlocked);
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

  const handlePostComment = () => {
    if (commentToEdit.id) {
      onEditComment(commentToEdit.id, newComment);
    }
    onPublishComment(newComment);
    setNewComment('');
  };

  return (
    <>
      <div className={styles['input-section']}>
        <input
          placeholder="Post a comment..."
          className={styles['comment-input']}
          type="text"
          name="comment"
          id="comment"
          value={newComment}
          onChange={handleNewCommentChange}
          onKeyDown={handleKeyDown}
          disabled={isBlocked}
        />
        {!isBlocked && (
          <Button style="primary" handleClick={handlePostComment}>
            {commentToEdit.id ? 'Edit' : 'Post'} &#x2713;
          </Button>
        )}
      </div>
    </>
  );
};

PublishComment.propTypes = {
  onPublishComment: PropTypes.func,
  commentToEdit: PropTypes.any,
  onEditComment: PropTypes.any,
  setCommentToEdit: PropTypes.any,
};

export default PublishComment;
