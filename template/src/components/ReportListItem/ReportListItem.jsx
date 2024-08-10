import PropTypes from 'prop-types';
import styles from './ReportListItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ReportListItem = ({ report, type }) => {
  return (
    <div className={styles['report-item']}>
      <div className={styles['report-content']}>
        <p>
          <strong>Reporter:</strong> {report.reporter}
        </p>
        <p>
          <strong>Type:</strong> {report.type}
        </p>
        {type === 'post' ? (
          <p>
            <strong>Post:</strong> {report.postTitle}
          </p>
        ) : (
          <p>
            <strong>Comment:</strong> {report.commentContent}
          </p>
        )}
      </div>
      <Link to={`/post/${report.id}`} className={styles['eye-icon']}>
        <FontAwesomeIcon icon={faEye} />
      </Link>
    </div>
  );
};

ReportListItem.propTypes = {
  report: PropTypes.shape({
    type: PropTypes.string.isRequired,
    postTitle: PropTypes.string,
    commentContent: PropTypes.string,
    id: PropTypes.string.isRequired,
    reporter: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.oneOf(['post', 'comment']).isRequired,
};

export default ReportListItem;
