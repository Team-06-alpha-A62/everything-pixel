import styles from './Button.module.scss';

function Button({ style, children }) {
  return <div className={styles[style]}>{children}</div>;
}

export default Button;
