import PropTypes from 'prop-types';
import styles from './Modal.module.scss';
import Button from '../../hoc/Button/Button.jsx';

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles['modal-overlay']} onClick={onClose}>
      <div
        className={styles['modal-content']}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles['close']} onClick={onClose}>
        <span>&times;</span>
        </div>
        {/* <button className={styles['close-button']} onClick={onClose}>
          &times;
        </button> */}
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
