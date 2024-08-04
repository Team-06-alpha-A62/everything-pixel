import PropTypes from 'prop-types';
import styles from './PostBody.module.scss';
import Button from '../../hoc/Button/Button';
import { useState } from 'react';

const PostBody = ({ title, content, tags }) => {
  const [showMoreClicked, setShowMoreClicked] = useState(false);

  const handleReadMoreClick = () => {
    setShowMoreClicked(clicked => !clicked);
  };

  return (
    <div className={styles}>
      <h1>{title}</h1>
      {content.length > 40 && !showMoreClicked ? (
        <div>
          {content.slice(0, 40)}...
          <Button style={'none'} handleClick={handleReadMoreClick}>
            Show more
          </Button>
        </div>
      ) : (
        <div>
          {content}
          {content.length > 40 && (
            <Button style={'none'} handleClick={handleReadMoreClick}>
              Show less
            </Button>
          )}
        </div>
      )}
      {tags.map(tag => (
        <span key={tag}>#{tag}</span>
      ))}
    </div>
  );
};

PostBody.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default PostBody;
