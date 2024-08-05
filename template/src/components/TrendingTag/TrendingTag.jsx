import PropTypes from 'prop-types';
import styles from './TrendingTag.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

const TrendingTag = ({ tag }) => {
  const { name } = tag;

  return (
    <div className={styles['trending-tag']}>
      <FontAwesomeIcon icon={faHashtag} className={styles['hashtag']} />
      <span className={styles['tag-title']}>{name}</span>
    </div>
  );
};

TrendingTag.propTypes = {
  tag: PropTypes.object,
};

export default TrendingTag;
