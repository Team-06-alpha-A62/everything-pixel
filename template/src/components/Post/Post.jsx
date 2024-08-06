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
import { hasUserVotedPost } from '../../services/posts.service.js';
import { useAuth } from '../../providers/AuthProvider.jsx';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function Post({ post }) {
  const { currentUser } = useAuth();
  const [postAuthor, setPostAuthor] = useState({});
  const [userVote, setUserVote] = useState(null);
  const navigate = useNavigate();

  const [postVotes, setPostVotes] = useState({ upVote: 0, downVote: 0 });

  const { author, title, content, tags, createdOn, comments, image } = post;

  const tagsArray = Object.keys(tags ?? {});
  const numberOfComments = Object.keys(comments ?? {}).length;

  const timeAgo = formatDistanceToNow(new Date(createdOn), {
    addSuffix: true,
  });

  const openPostDetails = () => {
    navigate(`/feed/post/${post.id}`);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByHandle(author);
      setPostAuthor(user);
    };
    fetchUser();
  }, [author]);

  useEffect(() => {
    if (!currentUser?.userData?.username) return;
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
          openPostDetails={openPostDetails}
        />
        <PostActions
          openPostDetails={openPostDetails}
          id={post.id}
          date={timeAgo}
          votes={postVotes}
          comments={numberOfComments}
          userVote={userVote}
          handleUserVoteChange={handleUserVoteChange}
        />
        <hr />
      </PostContainer>
    </>
  );
}

Post.propTypes = {
  post: PropTypes.any,
};

export default Post;
