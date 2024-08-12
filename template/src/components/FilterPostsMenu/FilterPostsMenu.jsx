import FilterByDate from '../FilterByDate/FilterByDate.jsx';
import FilterByTags from '../FilterByTags/FilterByTags.jsx';
import PropTypes from 'prop-types';
import styles from './FilterPostsMenu.module.scss';
import FilterByUser from '../FilterByUser/FilterByUser.jsx';

const FilterPostsMenu = () => {
  return (
    <div>
      <h2 className={styles['filter-posts-menu-header']}>Filter By</h2>
      <div>
        <FilterByDate filterCriteria={'date'} value={'date'} />
        <FilterByTags filterCriteria={'tags'} />
        <FilterByUser />
      </div>
    </div>
  );
};

FilterPostsMenu.propTypes = {
  handleFilterBy: PropTypes.func,
};

export default FilterPostsMenu;
