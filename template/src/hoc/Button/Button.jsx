import styles from './Button.module.scss';
import PropTypes from 'prop-types';
function Button({ style, children }) {
  return <div className={styles[style]}>{children}</div>;
}

Button.propTypes = {
  style: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};
export default Button;
