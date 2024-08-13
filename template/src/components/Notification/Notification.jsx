import PropTypes from 'prop-types';
import styles from './Notification.module.scss';
import { useEffect, useState } from 'react';
import { getPostByHandle } from '../../services/posts.service';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Notification = ({ notification }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (notification.postId) {
        const postData = await getPostByHandle(notification.postId);
        setPost(postData);
      }
    };
    fetchPost();
  }, [notification.postId]);

  return (
    <div className={styles['notification-item']}>
      {post?.image && (
        <img
          src={post.image}
          alt={post.title}
          className={styles['post-image']}
        />
      )}
      <div className={styles['notification-content']}>
        <p className={styles['notification-message']}>{notification.message}</p>
        {post && (
          <p className={styles['post-title']}>Related Post: {post.title}</p>
        )}
        <small className={styles['notification-date']}>
          {new Date(notification.createdAt).toLocaleString()}
        </small>
      </div>
      {notification.postId && (
        <Link
          to={`/post/${notification.postId}`}
          className={styles['eye-icon']}
        >
          <FontAwesomeIcon icon={faEye} />
        </Link>
      )}
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    isRead: PropTypes.bool.isRequired,
    postId: PropTypes.string.isRequired,
  }).isRequired,
};

export default Notification;
