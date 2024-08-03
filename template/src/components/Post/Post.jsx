import { useEffect, useState } from 'react';
import { getUserByHandle } from '../../services/users.service';
import PropTypes from 'prop-types';
function Post({ post }) {
  const [postAuthor, setPostAuthor] = useState({});
  const { author, title, content, tagsArray } = post;

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
