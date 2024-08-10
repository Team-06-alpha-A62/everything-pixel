import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfileSinglePost from '../ProfileSinglePost/ProfileSinglePost';
import styles from './UserDetails.module.scss';
import { getUserByHandle } from '../../services/users.service';
import { getPostByHandle } from '../../services/posts.service';
import { getCommentById } from '../../services/comments.service';
import CommentListItem from '../CommentListItem/CommentListItem';
import StatItem from '../StatItem/StatItem';

const UserDetails = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);
  const [selectedTab, setSelectedTab] = useState('posts');
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
        }

        if (userData.comments?.length) {
          const commentDetails = await Promise.all(
            userData.comments.map(async commentId => {
              const comment = await getCommentById(commentId);
              const post = await getPostByHandle(comment.postId);
              return { ...comment, postTitle: post.title };
            })
          );
          setComments(commentDetails);
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

  const handleSuspend = () => {
    // Handle the suspend logic here
    console.log('Suspend user');
  };

  const renderContent = () => {
    if (selectedTab === 'posts') {
      return posts.map((post, index) => (
        <ProfileSinglePost key={index} post={post} />
      ));
    } else if (selectedTab === 'comments') {
      return comments.map((comment, index) => (
        <CommentListItem key={index} comment={comment} />
      ));
    } else if (selectedTab === 'reports') {
      return <p>Reports content goes here.</p>;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['user-details-container']}>
      <div className={styles['header']}>
        <button onClick={handleBack} className={styles['back-button']}>
          &larr; Back
        </button>
        <ProfileHeader user={user} isLoadingAvatar={isLoadingAvatar} />
        <button onClick={handleSuspend} className={styles['suspend-button']}>
          Suspend
        </button>
      </div>

      <div className={styles['stats']}>
        <StatItem type="Posts" count={user.posts?.length || 0} />
        <StatItem type="Comments" count={user.comments?.length || 0} />
        <StatItem type="Followers" count={user.followers?.length || 0} />
        <StatItem type="Following" count={user.following?.length || 0} />
      </div>

      <div className={styles['tabs']}>
        <button
          className={`${styles['tab']} ${
            selectedTab === 'posts' ? styles['active'] : ''
          }`}
          onClick={() => setSelectedTab('posts')}
        >
          Posts
        </button>
        <button
          className={`${styles['tab']} ${
            selectedTab === 'comments' ? styles['active'] : ''
          }`}
          onClick={() => setSelectedTab('comments')}
        >
          Comments
        </button>
        <button
          className={`${styles['tab']} ${
            selectedTab === 'reports' ? styles['active'] : ''
          }`}
          onClick={() => setSelectedTab('reports')}
        >
          Reports
        </button>
      </div>

      <div className={styles['content']}>{renderContent()}</div>
    </div>
  );
};

export default UserDetails;
