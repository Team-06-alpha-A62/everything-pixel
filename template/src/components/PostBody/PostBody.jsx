import PropTypes from 'prop-types';
import styles from './PostBody.module.scss';
import Button from '../../hoc/Button/Button';

const PostBody = ({ title, content, tags, image, openPostDetails }) => {
  return (
    <div className={styles}>
      <h1>{title}</h1>
      <div>
        {content.length > 40 ? `${content.slice(0, 40)}...` : content}
        <br />
        <Button style={'none'} handleClick={openPostDetails}>
          Show details
        </Button>
      </div>

      {tags.map(tag => (
        <span key={tag}>#{tag}</span>
      ))}
      <img src={image} />
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
