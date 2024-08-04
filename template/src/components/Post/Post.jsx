import { useEffect, useState } from 'react';
import { getUserByHandle } from '../../services/users.service';
import PropTypes from 'prop-types';
import PostContainer from '../../hoc/PostContainer/PostContainer.jsx';
import PostAuthorDetails from '../PostAuthorDetails/PostAuthorDetails.jsx';
import PostBody from '../PostBody/PostBody.jsx';
import PostActions from '../PostActions/PostActions.jsx';
function Post({ post }) {
  const [postAuthor, setPostAuthor] = useState({});
  const { author, title, content, tags, createdOn, votes, image } = post;

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
      <PostAuthorDetails author={postAuthor}/>
      <PostBody title={title} content={content} tags={tagsArray} image={image}/>
      <PostActions date={createdOn} votes={votes} />
      <hr />
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.any,
};
export default Post;
