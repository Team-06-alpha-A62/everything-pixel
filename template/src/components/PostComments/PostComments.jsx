import PropTypes from 'prop-types';
import PublishComment from '../PublishComment/PublishComment';
import PostComment from '../PostComment/PostComment';

const PostComments = ({ comments, onPublishComment }) => {
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdOn) - new Date(a.createdOn)
  );
  return (
    <>
      <PublishComment onPublishComment={onPublishComment} />
      {comments.length === 0 ? (
        <p>No comments</p>
      ) : (
        <>
          {sortedComments.map(comment => {
            return <PostComment key={comment.id} comment={comment} />;
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
