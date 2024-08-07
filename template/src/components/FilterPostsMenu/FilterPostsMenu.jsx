import FilterByDate from '../FilterByDate/FilterByDate.jsx';
import FilterByTags from '../FilterByTags/FilterByTags.jsx';
import PropTypes from 'prop-types';
import styles from './FilterPostsMenu.module.scss';

const FilterPostsMenu = () => {
  return (
    <div>
      <h1>Filter By</h1>
      <div>
        <FilterByDate filterCriteria={'date'} value={'date'} />
        <FilterByTags filterCriteria={'tags'} />
      </div>
    </div>
  );
};

FilterPostsMenu.propTypes = {
  handleFilterBy: PropTypes.func,
};

export default FilterPostsMenu;
