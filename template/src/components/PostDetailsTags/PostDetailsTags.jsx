import React from 'react';
import PropTypes from 'prop-types';
import styles from './PostDetailsTags.module.scss';

const PostDetailsTags = ({ tagsArray }) => {
  return (
    !!tagsArray.length && (
      <div className={styles['tags']}>
        {tagsArray.map(tag => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>
    )
  );
};

PostDetailsTags.propTypes = {
  tagsArray: PropTypes.array.isRequired,
};

export default PostDetailsTags;
