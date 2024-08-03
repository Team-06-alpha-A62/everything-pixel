import FilterPostsMenu from '../FilterPostsMenu/FilterPostsMenu';
import SortPostsMenu from '../SortPostsMenu/SortPostsMenu';
import styles from './LeftSideBar.module.scss';
function LeftSideBar(onSortByClick, onFilterByClick) {
  return (
    <div className={styles.leftSideBar}>
      <SortPostsMenu onSortByClick={onSortByClick} />
      <FilterPostsMenu onFilterByClick={onFilterByClick} />
    </div>
  );
}

export default LeftSideBar;
