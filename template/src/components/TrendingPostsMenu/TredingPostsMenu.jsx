import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import TrendingPost from '../TrendingPost/TrendingPost';

const TredingPostsMenu = ({ posts, size }) => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const trending = getTrendingPosts(posts);
    setTrendingPosts(trending);
  }, [posts]);

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
