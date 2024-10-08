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
import { useAuth } from '../../providers/useAuth.js';
import { deleteImage } from '../../services/images.service';
import Button from '../../hoc/Button/Button.jsx';
import { createNotification } from '../../services/notification.service.js';

const PostDetailsHeader = ({ isCurrentUserBlocked, post }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [hasReported, setHasReported] = useState(false);

  useEffect(() => {
    if (
      post.reports &&
      Object.keys(post.reports).includes(currentUser.userData.username)
    ) {
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
    if (post.author !== currentUser.userData.username) {
      await createNotification(post.author, {
        type: 'report',
        message: `${currentUser.userData.username} reported on your post: ${reportType}`,
        postId: post.id,
      });
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
    navigate(-1);
  };

  return (
    <div className={styles['post-actions']}>
      <Button style="secondary" handleClick={handleBackButtonClick}>
        &larr; Back
      </Button>
      <div className={styles['controls']}>
        {post.isUserPost || currentUser.userData?.role === 'admin' ? (
          <>
            <Button
              style="primary"
              handleClick={() => navigate(`/edit/${post.id}`)}
              isDisabled={isCurrentUserBlocked}
            >
              Edit
            </Button>
            <Button
              style="alert"
              handleClick={() => setIsDeleteModalOpen(true)}
              isDisabled={isCurrentUserBlocked}
            >
              Delete
            </Button>
          </>
        ) : (
          <Button
            style="alert"
            handleClick={() => !hasReported && setIsReportModalOpen(true)}
            isDisabled={isCurrentUserBlocked || hasReported}
          >
            {hasReported ? 'Reported' : 'Report'}
          </Button>
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
  isCurrentUserBlocked: PropTypes.bool,
  post: PropTypes.object.isRequired,
};

export default PostDetailsHeader;
