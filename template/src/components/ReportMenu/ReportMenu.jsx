import PropTypes from 'prop-types';
import styles from './ReportMenu.module.scss';

const ReportMenu = ({ reportOptions, handleReportClick }) => {
  return (
    <div className={styles['report-menu']}>
      <h3>Report</h3>
      <ul>
        {Object.entries(reportOptions).map(([key, value]) => (
          <li
            key={key}
            className={styles['report-item']}
            onClick={() => handleReportClick(value)}
          >
            {key.replace('_', ' ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

ReportMenu.propTypes = {
  reportOptions: PropTypes.object.isRequired,
  handleReportClick: PropTypes.func.isRequired,
};

export default ReportMenu;
