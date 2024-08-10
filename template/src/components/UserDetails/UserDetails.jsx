import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfileSinglePost from '../ProfileSinglePost/ProfileSinglePost';
import styles from './UserDetails.module.scss';
import {
  changeUserDetails,
  getUserByHandle,
} from '../../services/users.service';
import { getPostByHandle } from '../../services/posts.service';
import { getCommentById } from '../../services/comments.service';
import CommentListItem from '../CommentListItem/CommentListItem';
import StatItem from '../StatItem/StatItem';
import Button from '../../hoc/Button/Button';
import ReportListItem from '../ReportListItem/ReportListItem';

const UserDetails = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [postReports, setPostReports] = useState([]);
  const [commentReports, setCommentReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);
  const [selectedTab, setSelectedTab] = useState('posts');
  const [isUserBlocked, setIsUserBlocked] = useState(user?.isBlocked);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserByHandle(username);
        setUser(userData);

        if (userData.posts?.length) {
          const postDetails = await Promise.all(
            userData.posts.map(postId => getPostByHandle(postId))
          );
          setPosts(postDetails);

          const postReportDetails = postDetails.flatMap(post => {
            return Object.entries(post?.reports || {}).map(
              ([reporter, type]) => ({
                id: post.id,
                type,
                postTitle: post.title,
                reporter,
              })
            );
          });
          setPostReports(postReportDetails);
        }

        if (userData.comments?.length) {
          const commentDetails = await Promise.all(
            userData.comments.map(async commentId => {
              const comment = await getCommentById(commentId);
              const post = await getPostByHandle(comment.postId);
              return { ...comment, post };
            })
          );
          setComments(commentDetails);
          const commentReportDetails = commentDetails.flatMap(comment => {
            return Object.entries(comment.reports || {}).map(
              ([reporter, type]) => ({
                id: comment.postId,
                type,
                commentContent: comment.content,
                reporter,
              })
            );
          });
          setCommentReports(commentReportDetails);
        }
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingAvatar(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleToggleUserBlock = async () => {
    if (isUserBlocked) {
      setIsUserBlocked(false);
      await changeUserDetails(username, 'isBlocked', false);
    } else {
      setIsUserBlocked(true);
      await changeUserDetails(username, 'isBlocked', true);
    }
  };

  const renderContent = () => {
    if (selectedTab === 'posts') {
      if (posts.length > 0) {
        return posts.map((post, index) => (
          <ProfileSinglePost key={index} post={post} />
        ));
      } else {
        return <p>No posts available.</p>;
      }
    } else if (selectedTab === 'comments') {
      if (comments.length > 0) {
        return comments.map((comment, index) => (
          <CommentListItem key={index} comment={comment} />
        ));
      } else {
        return <p>No comments available.</p>;
      }
    } else if (selectedTab === 'reports') {
      if (postReports.length > 0 || commentReports.length > 0) {
        return (
          <>
            {postReports.length > 0 &&
              postReports.map((report, index) => (
                <ReportListItem key={index} report={report} type="post" />
              ))}
            {commentReports.length > 0 &&
              commentReports.map((report, index) => (
                <ReportListItem key={index} report={report} type="comment" />
              ))}
          </>
        );
      } else {
        return <p>No reports available.</p>;
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['user-details-container']}>
      <div className={styles['header']}>
        <Button style="secondary" handleClick={handleBack}>
          Back
        </Button>
        <ProfileHeader user={user} isLoadingAvatar={isLoadingAvatar} />
        {isUserBlocked ? (
          <Button style="alert-secondary" handleClick={handleToggleUserBlock}>
            Unsuspend
          </Button>
        ) : (
          <Button style="alert" handleClick={handleToggleUserBlock}>
            Suspend
          </Button>
        )}
      </div>

      <div className={styles['stats']}>
        <StatItem type="Posts" count={user.posts?.length || 0} />
        <StatItem type="Comments" count={user.comments?.length || 0} />
        <StatItem type="Followers" count={user.followers?.length || 0} />
        <StatItem type="Following" count={user.following?.length || 0} />
      </div>

      <div className={styles['tabs']}>
        <span
          className={`${styles['tab']} ${
            selectedTab === 'posts' ? styles['active'] : ''
          }`}
          onClick={() => setSelectedTab('posts')}
        >
          Posts
        </span>
        <span
          className={`${styles['tab']} ${
            selectedTab === 'comments' ? styles['active'] : ''
          }`}
          onClick={() => setSelectedTab('comments')}
        >
          Comments
        </span>
        <span
          className={`${styles['tab']} ${
            selectedTab === 'reports' ? styles['active'] : ''
          }`}
          onClick={() => setSelectedTab('reports')}
        >
          Reports
        </span>
      </div>

      <div className={styles['content']}>{renderContent()}</div>
    </div>
  );
};

export default UserDetails;
