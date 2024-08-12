import PropTypes from 'prop-types';
import styles from './DeletePostConfirm.module.scss';
import Button from '../../hoc/Button/Button.jsx';

const DeletePostConfirm = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles['modal-content']}>
      <p>Are you sure you want to delete this post? <br/> You can&apos;t undo this action </p>
      <div className={styles['modal-actions']}>
        <Button handleClick={onConfirm} style='alert'>Confirm</Button>
        <Button handleClick={onCancel} style='alert-secondary'>Cancel</Button>
      </div>
    </div>
  );
};

DeletePostConfirm.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeletePostConfirm;
