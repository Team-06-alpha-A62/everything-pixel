import { useEffect, useState } from 'react';
import { getUserByHandle } from '../../services/users.service';
import PropTypes from 'prop-types';
import PostContainer from '../../hoc/PostContainer/PostContainer.jsx';
import PostAuthorDetails from '../PostAuthorDetails/PostAuthorDetails.jsx';
import PostBody from '../PostBody/PostBody.jsx';
import PostActions from '../PostActions/PostActions.jsx';
import PostComments from '../PostComments/PostComments.jsx';
import {
  createComment,
  getCommentById,
} from '../../services/comments.service.js';
function Post({ post }) {
  const [postAuthor, setPostAuthor] = useState({});
  const { author, title, content, tags, createdOn, votes, comments } = post;
  const [showPostComments, setShowPostComments] = useState(false);
  const [commentsObjectsArray, setCommentsObjectsArray] = useState([]);

  const tagsArray = Object.keys(tags ?? {});

  useEffect(() => {
    if (!comments || Object.keys(comments).length === 0) return;
    console.log(comments);
    const commentsData = Object.keys(comments ?? {}).map(async commentId => {
      const commentData = await getCommentById(commentId);
      return commentData;
    });
    setCommentsObjectsArray(commentsData);
  }, [comments]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByHandle(author);
      setPostAuthor(user);
    };
    fetchUser();
  }, [author]);

  const handleShowPostComments = () => {
    setShowPostComments(showPostComments => !showPostComments);
  };

  const handlePublishComment = async content => {
    try {
      const newComment = await createComment(post.id, post.author, content);
      const newCommentData = await getCommentById(newComment.key);
      setCommentsObjectsArray(commentsObjectsArray => [
        ...commentsObjectsArray,
        newCommentData,
      ]);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <PostContainer>
      <PostAuthorDetails author={postAuthor} />
      <PostBody title={title} content={content} tags={tagsArray} />
      <PostActions date={createdOn} votes={votes} />
      <hr />
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.any,
};
export default Post;
