import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getPostByHandle,
  hasUserVotedPost,
} from '../../services/posts.service';
import styles from './SinglePostDetails.module.scss';
import { createComment, getCommentById } from '../../services/comments.service';
import PostComments from '../../components/PostComments/PostComments';
import { useAuth } from '../../providers/AuthProvider';
import { userVoteInteractionWithPost } from '../../services/users.service';
import PostActions from '../../components/PostActions/PostActions';

const SinglePostDetails = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [post, setPost] = useState({});
  const [commentsObjectsArray, setCommentsObjectsArray] = useState([]);
  const [postVotes, setPostVotes] = useState({ upVote: 0, downVote: 0 });
  const [userVote, setUserVote] = useState(null);
  const { title, tags, image, content, comments, createdOn, edited } = post || {};
  const tagsArray = Object.values(tags ?? {});

  const { id } = useParams();

  useEffect(() => {
    if (!comments || Object.keys(comments).length === 0) return;
    const fetchComments = async () => {
      const commentsData = await Promise.all(
        Object.values(comments ?? {}).map(async commentId => {
          const commentData = await getCommentById(commentId);

          return commentData;
        })
      );
      setCommentsObjectsArray(commentsData);
    };
    fetchComments();
  }, [comments]);

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPostByHandle(id);
      setPost(post);
    };
    fetchPost();
  }, [id]);

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

  const handleBackButtonClick = () => {
    navigate('/feed');
  };

  return (
    <div className={styles['post-details']}>
      <div className={styles['headers']}>
        <div className={styles['post-actions']}>
          <button
            className={styles['btn']}
            onClick={handleBackButtonClick}
          >
            Back
          </button>
          <div className={styles['controls']}>
            <button className={styles['btn']} onClick={() => navigate(`/edit/${post.id}`)}>Edit</button>
            <button className={styles['btn']}>Delete</button>
            <button className={styles['btn']}>Report</button>
          </div>
        </div>
      </div>
      <div className={styles['title']}>{title}</div>
      {!!tagsArray.length && (
        <div className={styles['tags']}>
          {tagsArray.map(tag => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      )}
      <div className={styles['content-area']}>
        {image && (
          <div className={styles['image']}>
            <img src={image} alt="Post" />
          </div>
        )}
        <div className={styles['content']}>
          <p>{content}</p>
        </div>
      </div>
      <PostActions
        date={createdOn}
        votes={postVotes}
        userVote={userVote}
        handleUserVoteChange={handleUserVoteChange}
        isPostDetails={true}
        edited={edited}
      />
      <div>
        <PostComments
          comments={commentsObjectsArray}
          onPublishComment={handlePublishComment}
        />
      </div>
    </div>
  );
};

SinglePostDetails.propTypes = {};

export default SinglePostDetails;
