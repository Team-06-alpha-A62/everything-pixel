import PropTypes from 'prop-types';
import Post from '../Post/Post';

function Posts({ posts }) {
  return (
    <div>
      {posts.map(post => {
        return(
        <Post key={post.id} post={post} />
      )})}
    </div>
  );
}

Posts.propTypes = {
  posts: PropTypes.any.isRequired,
};
export default Posts;
