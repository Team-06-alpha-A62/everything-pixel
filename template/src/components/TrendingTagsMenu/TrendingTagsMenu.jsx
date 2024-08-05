import PropTypes from 'prop-types';
import styles from './TrendingTagsMenu.module.scss';
import { useEffect, useState } from 'react';
import { getAllTags } from '../../services/tags.service.js';
import TrendingTag from '../TrendingTag/TrendingTag.jsx';

const TrendingTagsMenu = ({ size }) => {
  const [trendingTags, setTrendingTags] = useState([]);

  const getTrendingTags = tags => {
    const sortedTags = [...tags].sort(
      (a, b) =>
        Object.values(b.posts ?? {}).length -
        Object.values(a.posts ?? {}).length
    );
    return sortedTags.slice(0, size);
  };

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
  }, []);

  return (
    <>
      {trendingTags.map(tag => (
        <TrendingTag tag={tag} key={tag.name} />
      ))}
    </>
  );
};

TrendingTagsMenu.propTypes = {
  size: PropTypes.number,
};

export default TrendingTagsMenu;
