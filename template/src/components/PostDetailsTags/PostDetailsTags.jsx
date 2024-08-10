import PropTypes from 'prop-types';
import styles from './PostDetailsTags.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

const PostDetailsTags = ({ tagsArray }) => {
  return (
    !!tagsArray.length && (
      <div className={styles['tags']}>
        {tagsArray.map(tag => (
          <>
            <div className={styles['tag']}>
              <FontAwesomeIcon icon={faHashtag} className={styles['hashtag']} />
              <span className={styles['tag-name']}>{tag}</span>
            </div>
          </>
        ))}
      </div>
    )
  );
};

PostDetailsTags.propTypes = {
  tagsArray: PropTypes.array.isRequired,
};

export default PostDetailsTags;
