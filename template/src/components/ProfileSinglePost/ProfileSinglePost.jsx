import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import {
  faComment,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-regular-svg-icons';
import styles from './ProfileSinglePost.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProfileSinglePost = ({ post }) => {
  const {
    title,
    image,
    content,
    tags,
    id,
    edited,
    createdOn,
    comments,
    votes,
  } = post;
  const navigate = useNavigate();
  const [postVotes, setPostVotes] = useState({ upVote: 0, downVote: 0 });

  useEffect(() => {
    const updatedPostVotes = {
      upVote: Object.values(votes || {}).filter(vote => vote === 'upVote')
        .length,
      downVote: Object.values(votes || {}).filter(vote => vote === 'downVote')
        .length,
    };
    setPostVotes(updatedPostVotes);
  }, [votes]);

  const navigateToSinglePostDetails = () => {
    navigate(`/post/${id}`);
  };

  return (
    <div
      className={styles['profile-post']}
      onClick={navigateToSinglePostDetails}
    >
      <div className={styles['post-thumbnail']}>
        {image && <img src={image} alt="post-thumbnail" />}
      </div>
      <div className={styles['post-content']}>
        <h3 className={styles['post-title']}>{title}</h3>

        <p>{content.length > 40 ? `${content.slice(0, 200)}...` : content}</p>
        <div className={styles['post-tags']}>
          {tags.length !== 0 &&
            tags.map(tag => (
              <div key={tag}>
                <FontAwesomeIcon
                  icon={faHashtag}
                  className={styles['hashtag']}
                />
                <span className={styles['tag-title']}>{tag}</span>
              </div>
            ))}
        </div>
        <div className={styles['statistics']}>
          <div>
            <span className={styles['time-created']}>
              {edited ? `edited: ${edited}` : createdOn}
            </span>
          </div>
          <div>
            <span>{comments.length}</span>
            <FontAwesomeIcon icon={faComment} />
          </div>
          <div>
            <span>{postVotes.upVote}</span>
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
          <div>
            <span>{postVotes.downVote}</span>
            <FontAwesomeIcon icon={faThumbsDown} />
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileSinglePost.propTypes = {
  post: PropTypes.object.isRequired,
};

export default ProfileSinglePost;
