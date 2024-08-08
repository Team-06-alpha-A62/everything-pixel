import PropTypes from 'prop-types';
import Post from '../Post/Post';
import { useState, useEffect } from 'react';
import styles from './Posts.module.scss';
import animationData from '../../assets/pacman-loading-animation.json';
import Lottie from 'lottie-react';

function Posts({ posts }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles['posts-page']}>
      <div className={styles['posts-container']}>
        {isLoading ? (
          <Lottie
            animationData={animationData}
            className={styles['lottie-animation']}
          />
        ) : (
          posts.map(post => (
            <div className={styles['post-item']} key={post.id}>
              <Post post={post} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string,
      createdOn: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      edited: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.string,
      title: PropTypes.string.isRequired,
      tags: PropTypes.objectOf(PropTypes.bool),
    })
  ).isRequired,
};

export default Posts;
