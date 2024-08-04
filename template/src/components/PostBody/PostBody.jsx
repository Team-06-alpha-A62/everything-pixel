import PropTypes from 'prop-types';
import styles from './PostBody.module.scss';

const PostBody = ({ title, content, tags }) => {
  return (
    <div className={styles}>
      <h1>{title}</h1>
      <p>{content}</p>
      {tags.map(tag => <span key={tag}>#{tag}</span>)}
    </div>
  );
};

PostBody.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default PostBody;
