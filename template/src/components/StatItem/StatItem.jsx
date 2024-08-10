import PropTypes from 'prop-types';
import styles from './StatItem.module.scss';

const StatItem = ({ type, count }) => {
  return (
    <div className={styles['stat-item']}>
      <p>{type}</p>
      <h3>{count}</h3>
    </div>
  );
};

StatItem.propTypes = {
  type: PropTypes.string.isRequired, // The type of the stat (e.g., "Posts", "Comments")
  count: PropTypes.number.isRequired, // The count associated with the stat
};

export default StatItem;
