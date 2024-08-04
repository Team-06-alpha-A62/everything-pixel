import { useEffect, useState } from 'react';
import { getUserByHandle } from '../../services/users.service';
import PropTypes from 'prop-types';
import PostContainer from '../../hoc/PostContainer/PostContainer.jsx';
import PostAuthorDetails from '../PostAuthorDetails/PostAuthorDetails.jsx';
import PostBody from '../PostBody/PostBody.jsx';
function Post({ post }) {
  const [postAuthor, setPostAuthor] = useState({});
  const { author, title, content, tags, createdOn } = post;

  const tagsArray = Object.keys(tags ?? {});

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByHandle(author);
      setPostAuthor(user);
    };
    fetchUser();
  }, [author]);

  return (
    <PostContainer>
      <PostAuthorDetails author={author}/>
      <PostBody title={title} content={content} tags={tagsArray}/>
      <br />
      {new Date(createdOn).toLocaleDateString()}
      <br />
      <button type="button" onClick={() => alert(postAuthor.email)}>
        click
      </button>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.any,
};
export default Post;
