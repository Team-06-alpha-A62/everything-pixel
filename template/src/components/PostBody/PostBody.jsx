import PropTypes from 'prop-types';
import styles from './PostBody.module.scss';
import Button from '../../hoc/Button/Button.jsx';

const PostBody = ({ title, content, tags, image, openPostDetails }) => {
  return (
    <div className={styles['post-body']}>
      <h1 className={styles['post-title']}>
        {title.length > 50 ? `${title.slice(0, 50)}...` : title}
      </h1>
      <div className={styles['tags']}>
        {tags.map(tag => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>
      <div className={styles['content']}>
        {content.length > 40 ? `${content.slice(0, 40)}...` : content}
        <Button style="tertiary" handleClick={openPostDetails}>
          Show details
        </Button>
      </div>

      <div className={styles['image-container']}>
        {<img src={image} alt={title} className={styles['image']} />}
      </div>
    </div>
  );
};

PostBody.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  openPostDetails: PropTypes.func,
};

export default PostBody;
