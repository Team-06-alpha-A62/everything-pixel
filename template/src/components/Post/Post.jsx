import { useEffect, useState } from 'react';
import { getUserByHandle } from '../../services/users.service';
import PropTypes from 'prop-types';
function Post({ post }) {
  const [postAuthor, setPostAuthor] = useState({});
  const { author, title, content, tagsArray, createdOn } = post;

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByHandle(author);
      setPostAuthor(user);
    };
    fetchUser();
  }, [author]);

  return (
    <div>
      {title}
      <br />
      {new Date(createdOn).toLocaleDateString()}
      <br />
      <button type="button" onClick={() => alert(postAuthor.email)}>
        click
      </button>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.any,
};
export default Post;
