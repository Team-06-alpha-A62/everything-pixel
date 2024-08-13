import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getPostByHandle } from '../../services/posts.service.js';
import ProfileSinglePost from '../ProfileSinglePost/ProfileSinglePost.jsx';
import styles from './MyPosts.module.scss';

const MyPosts = ({ posts }) => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const postsData = await Promise.all(
          posts.map(post => getPostByHandle(post))
        );
        setMyPosts(postsData);
      };
      fetchPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, [posts]);

  return (
    <div className={styles['my-posts-container']}>
      {myPosts.length ? (
        myPosts.map(post => {
          return <ProfileSinglePost key={post.id} post={post} />;
        })
      ) : (
        <p className={styles['no-data-message']}>No Posts Yet</p>
      )}
    </div>
  );
};

MyPosts.propTypes = {
  posts: PropTypes.array,
};

export default MyPosts;
