import PropTypes from 'prop-types';
import styles from './PostDetailsContent.module.scss';

const PostDetailsContent = ({ image, content }) => {
  return (
    <div className={styles['content-area']}>
      {image && (
        <div className={styles['image']}>
          <img src={image} alt="Post" />
        </div>
      )}
      <div className={styles['content']}>
        <p>{content}</p>
      </div>
    </div>
  );
};

PostDetailsContent.propTypes = {
  image: PropTypes.string,
  content: PropTypes.string,
};

export default PostDetailsContent;
