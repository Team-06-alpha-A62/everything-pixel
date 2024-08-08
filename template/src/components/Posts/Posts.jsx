import PropTypes from 'prop-types';
import Post from '../Post/Post';
import { useState } from 'react';
import styles from './Posts.module.scss';
import animationData from '../../assets/pacman-loading-animation.json';
import Lottie from 'lottie-react';

function Posts({ posts }) {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1000);

  return (
    <div>
      {isLoading ? (
        <Lottie
          animationData={animationData}
          className={styles['lottie-animation']}
        />
      ) : (
        posts.map(post => <Post key={post.id} post={post} />)
      )}
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
