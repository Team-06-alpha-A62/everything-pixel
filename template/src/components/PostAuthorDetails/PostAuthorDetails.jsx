import PropTypes from 'prop-types';
import styles from './PostAuthorDetails.module.scss';
import Avatar from 'react-avatar';

// avatar should be included later
const PostAuthorDetails = ({ author }) => {
  return (
    <div className={styles.authorDetails}>
      <Avatar name={`${author.firstName} ${author.lastName}`} round={true} size='50' src={author.avatarUrl}/>
      <span>{author.username}</span>
    </div>
  );
};

PostAuthorDetails.propTypes = {
  author: PropTypes.objectOf(PropTypes.any),
};

export default PostAuthorDetails;
