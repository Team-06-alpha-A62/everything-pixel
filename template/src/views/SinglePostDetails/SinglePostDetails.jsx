import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getPostByHandle,
  hasUserVotedPost,
} from '../../services/posts.service';
import styles from './SinglePostDetails.module.scss';
import {
  createComment,
  deleteComment,
  editCommentContent,
  getCommentById,
} from '../../services/comments.service';
import PostComments from '../../components/PostComments/PostComments';
import { useAuth } from '../../providers/AuthProvider';
import { userVoteInteractionWithPost } from '../../services/users.service';
import PostActions from '../../components/PostActions/PostActions';
import { createPostReport } from '../../services/reports.services';
import PostDetailsHeader from '../../components/PostDetailsHeader/PostDetailsHeader';
import PostDetailsTitle from '../../components/PostDetailsTitle/PostDetailsTitle';
import PostDetailsTags from '../../components/PostDetailsTags/PostDetailsTags';
import PostDetailsContent from '../../components/PostDetailsContent/PostDetailsContent';

const SinglePostDetails = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [post, setPost] = useState({});
  const [commentsObjectsArray, setCommentsObjectsArray] = useState([]);
  const [postVotes, setPostVotes] = useState({ upVote: 0, downVote: 0 });
  const [userVote, setUserVote] = useState(null);
  //const [showReportDropdown, setShowReportDropdown] = useState(false);

  const { title, tags, image, content, comments, createdOn, edited } =
    post || {};
  const tagsArray = Object.values(tags ?? {});

  const { id } = useParams();

  useEffect(() => {
    if (
      !comments ||
      Object.keys(comments).length === 0 ||
      !currentUser?.userData
    )
      return;
    const fetchComments = async () => {
      const commentsData = await Promise.all(
        Object.values(comments ?? {}).map(async commentId => {
          const commentData = await getCommentById(commentId);
          commentData.isUserComment =
            commentData.author === currentUser.userData.username;
          return commentData;
        })
      );
      setCommentsObjectsArray(commentsData);
    };
    fetchComments();
  }, [comments, currentUser.userData]);

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPostByHandle(id);
      post.isUserPost = post.author === currentUser.userData.username;
      setPost(post);
    };
    fetchPost();
  }, [id, currentUser?.userData]);

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
      newCommentData.isUserComment = true;
      setCommentsObjectsArray(prevCommentsObjectsArray => [
        ...prevCommentsObjectsArray,
        newCommentData,
      ]);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteComment = async commentId => {
    await deleteComment(commentId, post.id);
    const updatedCommentsObjectsArray = commentsObjectsArray.filter(
      comment => comment.id !== commentId
    );
    setCommentsObjectsArray(updatedCommentsObjectsArray);
  };

  const handleEditComment = async (commentId, commentNewContent) => {
    try {
      await editCommentContent(commentId, commentNewContent);
      const editedCommentsObjectsArray = commentsObjectsArray.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, content: commentNewContent, edited: Date.now() };
        }
        return comment;
      });
      setCommentsObjectsArray(editedCommentsObjectsArray);
    } catch (error) {
      alert('editing comment error:', error.message);
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
    <div className={styles['post-details']}>
      <div className={styles['headers']}>
        <PostDetailsHeader post={post} />
      </div>
      <PostDetailsTitle title={title} />
      <PostDetailsTags tagsArray={tagsArray} />
      <PostDetailsContent image={image} content={content} />
      <PostActions
        id={post.id}
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
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
        />
      </div>
    </div>
  );
};

SinglePostDetails.propTypes = {};

export default SinglePostDetails;
