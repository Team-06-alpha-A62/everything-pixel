import styles from './Button.module.scss';
import PropTypes from 'prop-types';
function Button({ style, children, handleClick, isDisabled }) {
  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={styles[style]}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  style: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  handleClick: PropTypes.func,
};
export default Button;
