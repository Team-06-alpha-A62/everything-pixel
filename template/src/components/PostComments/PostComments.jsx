import PropTypes from 'prop-types';
import PublishComment from '../PublishComment/PublishComment';

const PostComments = ({ comments, onPublishComment }) => {
  return (
    <>
      {comments.length === 0 ? (
        <p>No comments</p>
      ) : (
        <>
          {comments.map((comment, index) => {
            console.log(comment);
            return <p key={index}>{comment.content}</p>;
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
