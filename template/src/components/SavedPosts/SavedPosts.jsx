import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getPostByHandle } from '../../services/posts.service.js';
import ProfileSinglePost from '../ProfileSinglePost/ProfileSinglePost.jsx';
import styles from './SavedPosts.module.scss';

const SavedPosts = ({ posts }) => {
  const [savedPosts, setSavedPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const postsData = await Promise.all(
          posts.map(post => getPostByHandle(post))
        );
        setSavedPosts(postsData);
      };
      fetchPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, [posts]);

  return (
    <div className={styles['saved-posts-container']}>
      {savedPosts.length ? (
        savedPosts.map(post => {
          return <ProfileSinglePost key={post.id} post={post} />;
        })
      ) : (
        <p>No Posts Yet</p>
      )}
    </div>
  );
};

SavedPosts.propTypes = {
  posts: PropTypes.array,
};

export default SavedPosts;
