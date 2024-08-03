import SideBarContainer from '../../hoc/SideBarContainer/SideBarContainer';
import FilterPostsMenu from '../FilterPostsMenu/FilterPostsMenu';
import SortPostsMenu from '../SortPostsMenu/SortPostsMenu';
import PropTypes from 'prop-types';
import styles from './LeftSideBar.module.scss';

const LeftSideBar = ({ handleSortBy, onFilterByClick }) => {
  return (
    <div className={styles.leftSideBar}>
      <SideBarContainer>
        <SortPostsMenu handleSortBy={handleSortBy} />
      </SideBarContainer>
      <SideBarContainer>
        <FilterPostsMenu onFilterByClick={onFilterByClick} />
      </SideBarContainer>
    </div>
  );
};

LeftSideBar.propTypes = {
  handleSortBy: PropTypes.func,
  onFilterByClick: PropTypes.func,
};
export default LeftSideBar;
