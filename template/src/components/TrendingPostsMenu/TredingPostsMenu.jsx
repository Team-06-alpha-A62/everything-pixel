import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import TrendingPost from '../TrendingPost/TrendingPost';
import { getAllPosts } from '../../services/posts.service';

const TredingPostsMenu = ({ size }) => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllPosts();
      const trending = getTrendingPosts(posts);
      setTrendingPosts(trending);
    };
    fetchPosts();
  }, []);

  const getTrendingPosts = posts => {
    const sortedPosts = [...posts].sort(
      (a, b) =>
        Object.values(b.comments ?? {}).length +
        Object.values(b.votes ?? {}).length -
        (Object.values(a.comments ?? {}).length +
          Object.values(a.votes ?? {}).length)
    );
    return sortedPosts.slice(0, size);
  };

  return (
    <>
      <h2>Trending Posts:</h2>
      {trendingPosts.map(post => (
        <TrendingPost trendingPost={post} key={post.id} />
      ))}
    </>
  );
};

TredingPostsMenu.propTypes = {
  posts: PropTypes.any,
  size: PropTypes.number,
};

export default TredingPostsMenu;
