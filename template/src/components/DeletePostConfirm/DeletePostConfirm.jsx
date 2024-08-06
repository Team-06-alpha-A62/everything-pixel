import PropTypes from 'prop-types';
import styles from './DeletePostConfirm.module.scss';

const DeletePostConfirm = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles['modal-content']}>
      <p>Are you sure you want to delete this post?</p>
      <div className={styles['modal-actions']}>
        <button className={styles['btn']} onClick={onConfirm}>
          Yes
        </button>
        <button className={styles['btn']} onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  );
};

DeletePostConfirm.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeletePostConfirm;
