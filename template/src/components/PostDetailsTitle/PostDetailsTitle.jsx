import PropTypes from 'prop-types';
import styles from './PostDetailsTitle.module.scss';

const PostDetailsTitle = ({ title }) => {
  return <h1 className={styles['title']}>{title}</h1>;
};

PostDetailsTitle.propTypes = {
  title: PropTypes.string,
};

export default PostDetailsTitle;
