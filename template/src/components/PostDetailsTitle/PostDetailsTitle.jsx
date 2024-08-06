import PropTypes from 'prop-types';
import styles from './PostDetailsTitle.module.scss';

const PostDetailsTitle = ({ title }) => {
  return <div className={styles['title']}>{title} hiii</div>;
};

PostDetailsTitle.propTypes = {
  title: PropTypes.string,
};

export default PostDetailsTitle;
