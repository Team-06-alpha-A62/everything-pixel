import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getAllTags } from '../../services/tags.service.js';
import TrendingTag from '../TrendingTag/TrendingTag.jsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../providers/useAuth.js';

const TrendingTagsMenu = ({ size }) => {
  const { currentUser } = useAuth();
  const [trendingTags, setTrendingTags] = useState([]);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getAllTags();
        const trending = getTrendingTags(tags);
        setTrendingTags(trending);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTags();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getTrendingTags = tags => {
    const sortedTags = [...tags].sort(
      (a, b) =>
        Object.values(b.posts ?? {}).length -
        Object.values(a.posts ?? {}).length
    );
    return sortedTags.slice(0, size);
  };

  const handleTagClick = tag => {
    if (!currentUser.user) {
      navigate('/login');
      return
    }

    searchParams.set(`filterByTags`, tag);
    navigate({ search: searchParams.toString() });
  };

  return (
    <>
      <h2>Trending Tags</h2>
      {trendingTags.map(tag => (
        <TrendingTag
          key={tag.name}
          tag={tag}
          postsCount={Object.values(tag.posts).length}
          handleTagClick={handleTagClick}
        />
      ))}
    </>
  );
};

TrendingTagsMenu.propTypes = {
  size: PropTypes.number.isRequired,
};

export default TrendingTagsMenu;
