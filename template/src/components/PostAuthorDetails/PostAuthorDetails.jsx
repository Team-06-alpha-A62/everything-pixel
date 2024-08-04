import PropTypes from 'prop-types';
import styles from './PostAuthorDetails.module.scss';

// avatar should be included later
const PostAuthorDetails = ({ author }) => {
  return (
    <div className={styles.authorDetails}>
      <span>{author.username}</span>
    </div>
  );
};

PostAuthorDetails.propTypes = {
  author: PropTypes.objectOf(PropTypes.any),
};

export default PostAuthorDetails;
