import PropTypes from 'prop-types';
import styles from './TrendingTag.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

const TrendingTag = ({ tag, postsCount, handleTagClick }) => {
  const { name } = tag;

  return (
    <div
      className={styles['trending-tag']}
      onClick={() => handleTagClick(name)}
    >
      <FontAwesomeIcon icon={faHashtag} className={styles['hashtag']} />
      <span className={styles['tag-title']}>{name}</span>
      <span className={styles['posts-count']}>{postsCount}</span>
    </div>
  );
};

TrendingTag.propTypes = {
  tag: PropTypes.shape({
    name: PropTypes.string.isRequired,
    posts: PropTypes.objectOf(PropTypes.bool).isRequired,
  }).isRequired,
  postsCount: PropTypes.number.isRequired,
  handleTagClick: PropTypes.func.isRequired,
};

export default TrendingTag;
