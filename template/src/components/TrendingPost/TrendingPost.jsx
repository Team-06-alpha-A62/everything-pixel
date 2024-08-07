import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import styles from './TrendingPost.module.scss';
import { useNavigate } from 'react-router-dom';

const TrendingPost = ({ trendingPost }) => {
  const { title } = trendingPost;
  const navigate = useNavigate();

  const navigateToSinglePostDetails = () => {
    navigate(`/post/${trendingPost.id}`);
  };

  return (
    <div
      className={styles['trending-post']}
      onClick={navigateToSinglePostDetails}
    >
      <span className={styles['post-title']}>{title}</span>
      <FontAwesomeIcon icon={faAnglesRight} className={styles['post-icon']} />
    </div>
  );
};

TrendingPost.propTypes = {
  trendingPost: PropTypes.object.isRequired,
};

export default TrendingPost;
