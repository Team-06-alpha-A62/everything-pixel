import styles from './SideBarContainer.module.scss';
import PropTypes from 'prop-types';
function SideBarContainer({ children }) {
  return <div className={styles.sideBarContainer}>{children}</div>;
}

SideBarContainer.propTypes = {
  children: PropTypes.any.isRequired,
};

export default SideBarContainer;
