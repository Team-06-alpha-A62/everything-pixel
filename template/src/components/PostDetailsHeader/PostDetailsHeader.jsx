import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './PostDetailsHeader.module.scss';

import postReportEnum from '../../enums/postReportEnum';
import { createPostReport } from '../../services/reports.services';
import { deletePost } from '../../services/posts.service';
import Modal from '../Modal/Modal';
import ReportMenu from '../ReportMenu/ReportMenu';
import DeletePostConfirm from '../DeletePostConfirm/DeletePostConfirm';
import { useAuth } from '../../providers/AuthProvider';
import { deleteImage } from '../../services/images.service';

const PostDetailsHeader = ({ post }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [hasReported, setHasReported] = useState(false);

  useEffect(() => {
    if (post.reports && post.reports.includes(currentUser.userData.username)) {
      setHasReported(true);
    }
  }, [post, currentUser?.userData?.username]);

  const handleReportClick = async reportType => {
    try {
      await createPostReport(
        post.id,
        reportType,
        currentUser.userData.username
      );
      setHasReported(true);
      setIsReportModalOpen(false);
    } catch (error) {
      alert(`Failed to report: ${error.message}`);
    }
  };

  const handleDeleteClick = async () => {
    try {
      if (post.image) await deleteImage(post.image);
      await deletePost(currentUser.userData.username, post.id);
      navigate('/feed');
    } catch (error) {
      alert(`Failed to delete post: ${error.message}`);
    }
  };

  const handleBackButtonClick = () => {
    navigate('/feed');
  };

  return (
    <div className={styles['post-actions']}>
      <button className={styles['btn']} onClick={handleBackButtonClick}>
        Back
      </button>
      <div className={styles['controls']}>
        {post.isUserPost ? (
          <>
            <button
              className={styles['btn']}
              onClick={() => navigate(`/edit/${post.id}`)}
            >
              Edit
            </button>
            <button
              className={styles['btn']}
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete
            </button>
          </>
        ) : (
          <button
            className={`${styles['btn']} ${
              hasReported ? styles['reported'] : ''
            }`}
            onClick={() => !hasReported && setIsReportModalOpen(true)}
            disabled={hasReported}
          >
            {hasReported ? 'Reported' : 'Report'}
          </button>
        )}
      </div>
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      >
        <ReportMenu
          reportOptions={postReportEnum}
          handleReportClick={handleReportClick}
        />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <DeletePostConfirm
          onConfirm={handleDeleteClick}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

PostDetailsHeader.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostDetailsHeader;
