import PropTypes from 'prop-types';
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
      <p className={styles['post-title']}>{title}</p>
    </div>
  );
};

TrendingPost.propTypes = {
  trendingPost: PropTypes.object.isRequired,
};

export default TrendingPost;
