import PropTypes from 'prop-types';
import TrendingPost from '../TrendingPost/TrendingPost.jsx';
import { useEffect, useState } from 'react';
import { getPostByHandle } from '../../services/posts.service.js';

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
  }, []);

  return (
    <>
      {myPosts.length ? (
        myPosts.map(post => {
          return <TrendingPost key={post.id} trendingPost={post} />;
        })
      ) : (
        <p>No Posts Yet</p>
      )}
    </>
  );
};

MyPosts.propTypes = {
  posts: PropTypes.array,
};

export default MyPosts;
