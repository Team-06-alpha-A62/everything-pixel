import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './PostDetailsHeader.module.scss';
import postReportEnum from '../../enums/postReportEnum';
import { useState } from 'react';
import { createPostReport } from '../../services/reports.services';

const PostDetailsHeader = ({ post }) => {
  const navigate = useNavigate();
  const [showReportDropdown, setShowReportDropdown] = useState(false);

  const handleReportClick = async reportType => {
    try {
      await createPostReport(post.id, reportType);
      setShowReportDropdown(false);
    } catch (error) {
      alert(`Failed to report: ${error.message}`);
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
      <div
        className={styles['controls']}
        onMouseEnter={() => setShowReportDropdown(true)}
        onMouseLeave={() => setShowReportDropdown(false)}
      >
        {post.isUserPost ? (
          <>
            <button
              className={styles['btn']}
              onClick={() => navigate(`/edit/${post.id}`)}
            >
              Edit
            </button>
            <button className={styles['btn']}>Delete</button>
          </>
        ) : (
          <div className={styles['dropdown']}>
            <button className={styles['btn']}>Report</button>
            {showReportDropdown && (
              <ul className={styles['dropdown-menu']}>
                {Object.entries(postReportEnum).map(([key, value]) => (
                  <li
                    key={key}
                    className={styles['dropdown-item']}
                    onClick={() => handleReportClick(value)}
                  >
                    {key.replace('_', ' ')}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

PostDetailsHeader.propTypes = {
  post: PropTypes.object.isRequired,
  setShowReportDropdown: PropTypes.func.isRequired,
  showReportDropdown: PropTypes.bool.isRequired,
  handleBackButtonClick: PropTypes.func.isRequired,
  handleReportClick: PropTypes.func.isRequired,
};

export default PostDetailsHeader;
