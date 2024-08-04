import PropTypes from 'prop-types';
import PublishComment from '../PublishComment/PublishComment';
import PostComment from '../PostComment/PostComment';

const PostComments = ({ comments, onPublishComment }) => {
  return (
    <>
      {comments.length === 0 ? (
        <p>No comments</p>
      ) : (
        <>
          {comments.map(comment => {
            return <PostComment key={comment.id} comment={comment} />;
          })}
        </>
      )}
      <PublishComment onPublishComment={onPublishComment} />
    </>
  );
};

PostComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  onPublishComment: PropTypes.func,
};

export default PostComments;
