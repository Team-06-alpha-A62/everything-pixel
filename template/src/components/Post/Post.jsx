import { useEffect, useState } from 'react';
import { getUserByHandle } from '../../services/users.service';
import PropTypes from 'prop-types';
function Post({ post }) {
  const [postUser, setPostUser] = useState(null);
  const { authorUsername, title, content, tagsArray } = post;

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByHandle();
      setPostUser(user);
    };
    fetchUser();
  });
  return <div>{title}</div>;
}

Post.propTypes = {
  post: PropTypes.any,
};
export default Post;
