import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import styles from './TrendingPost.module.scss';

const TrendingPost = ({ trendingPost }) => {
  const { title } = trendingPost;

  return (
    <div className={styles.trendingPost}>
      <span className={styles.postTitle}>{title}</span>
      <FontAwesomeIcon icon={faAnglesRight} className={styles.postIcon} />
    </div>
  );
};

TrendingPost.propTypes = {
  trendingPost: PropTypes.object.isRequired,
};

export default TrendingPost;
