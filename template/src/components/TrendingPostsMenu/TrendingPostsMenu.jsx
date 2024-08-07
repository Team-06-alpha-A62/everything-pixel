import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import TrendingPost from '../TrendingPost/TrendingPost';
//import { getAllPosts } from '../../services/posts.service';

const TrendingPostsMenu = ({ size, posts }) => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      //const posts = await getAllPosts();
      const trending = getTrendingPosts(posts);
      setTrendingPosts(trending);
    };
    fetchPosts();
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
      <h2>Trending Posts:</h2>
      {trendingPosts.map(post => (
        <TrendingPost trendingPost={post} key={post.id} />
      ))}
    </>
  );
};

TrendingPostsMenu.propTypes = {
  size: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string,
      createdOn: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      edited: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.string,
      title: PropTypes.string.isRequired,
      tags: PropTypes.objectOf(PropTypes.bool),
    })
  ).isRequired,
};

export default TrendingPostsMenu;
