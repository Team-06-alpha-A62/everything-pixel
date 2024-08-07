import PropTypes from 'prop-types';
import Post from '../Post/Post';

function Posts({ posts }) {
  return (
    <div>
      {posts.map(post => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string,
      createdOn: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      edited: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.string,
      title: PropTypes.string.isRequired,
      tags: PropTypes.objectOf(PropTypes.bool),
    })
  ).isRequired,
};
export default Posts;
