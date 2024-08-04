import { useEffect, useState } from 'react';
import {
  getUserByHandle,
  userVoteInteractionWithPost,
} from '../../services/users.service';
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
import { hasUserVotedPost } from '../../services/posts.service.js';
import { useAuth } from '../../providers/AuthProvider.jsx';

function Post({ post }) {
  const { currentUser } = useAuth();
  const [postAuthor, setPostAuthor] = useState({});
  const [showPostComments, setShowPostComments] = useState(false);
  const [commentsObjectsArray, setCommentsObjectsArray] = useState([]);
  const [userVote, setUserVote] = useState(null);
  const [postVotes, setPostVotes] = useState({ upVote: 0, downVote: 0 });

  const { author, title, content, tags, createdOn, comments, image } = post;

  const tagsArray = Object.keys(tags ?? {});

  useEffect(() => {
    if (!comments || Object.keys(comments).length === 0) return;
    const fetchComments = async () => {
      const commentsData = await Promise.all(
        Object.keys(comments ?? {}).map(async commentId => {
          const commentData = await getCommentById(commentId);
          return commentData;
        })
      );
      console.log(commentsData);
      setCommentsObjectsArray(commentsData);
    };
    fetchComments();
  }, [comments]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByHandle(author);
      setPostAuthor(user);
    };
    fetchUser();
  }, [author]);

  useEffect(() => {
    if (!currentUser.userData?.username) return;
    const fetchVoteData = async () => {
      const result = await hasUserVotedPost(
        currentUser.userData.username,
        post.id
      );
      setUserVote(result);
    };
    fetchVoteData();
  }, [currentUser, post.id]);

  useEffect(() => {
    const updatedPostVotes = {
      upVote: Object.values(post.votes || {}).filter(vote => vote === 'upVote')
        .length,
      downVote: Object.values(post.votes || {}).filter(
        vote => vote === 'downVote'
      ).length,
    };
    setPostVotes(updatedPostVotes);
  }, [post.votes]);

  const handleShowPostComments = () => {
    setShowPostComments(prevShowPostComments => !prevShowPostComments);
  };

  const handlePublishComment = async content => {
    try {
      const newComment = await createComment(
        post.id,
        currentUser.userData.username,
        content
      );
      const newCommentData = await getCommentById(newComment.key);
      setCommentsObjectsArray(prevCommentsObjectsArray => [
        ...prevCommentsObjectsArray,
        newCommentData,
      ]);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUserVoteChange = async type => {
    try {
      let updatedVotes = { ...postVotes };
      if (userVote === type) {
        await userVoteInteractionWithPost(
          null,
          post.id,
          currentUser.userData.username
        );
        setUserVote(null);
        updatedVotes[type] -= 1;
      } else {
        if (userVote) {
          updatedVotes[userVote] -= 1;
        }
        await userVoteInteractionWithPost(
          type,
          post.id,
          currentUser.userData.username
        );
        setUserVote(type);
        updatedVotes[type] += 1;
      }
      setPostVotes(updatedVotes);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <PostContainer>
        <PostAuthorDetails author={postAuthor} />
        <PostBody
          title={title}
          content={content}
          tags={tagsArray}
          image={image}
        />
        <PostActions
          date={createdOn}
          votes={postVotes}
          onShowPostCommentsChange={handleShowPostComments}
          userVote={userVote}
          handleUserVoteChange={handleUserVoteChange}
        />
        {showPostComments && (
          <PostComments
            comments={commentsObjectsArray}
            onPublishComment={handlePublishComment}
          />
        )}
        <hr />
      </PostContainer>
    </>
  );
}

Post.propTypes = {
  post: PropTypes.any,
};

export default Post;
