import PropTypes from 'prop-types';
import styles from './PostContainer.module.scss';

const PostContainer = ({ children }) => {
  return <div className={styles.postContainer}>{children}</div>;
};

PostContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PostContainer;
