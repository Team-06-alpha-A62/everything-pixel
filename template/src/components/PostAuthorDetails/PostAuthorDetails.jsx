import PropTypes from 'prop-types';
import styles from './PostAuthorDetails.module.scss';

// avatar should be included later
const PostAuthorDetails = ({ author }) => {
  return (
    <div className={styles.authorDetails}>
      <span>{author}</span>
    </div>
  );
};

PostAuthorDetails.propTypes = {
  author: PropTypes.string.isRequired,
};

export default PostAuthorDetails;
