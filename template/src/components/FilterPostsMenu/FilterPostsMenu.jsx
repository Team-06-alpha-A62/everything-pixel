import FilterByDate from '../FilterByDate/FilterByDate.jsx';
import FilterByTags from '../FilterByTags/FilterByTags.jsx';
import PropTypes from 'prop-types';
import styles from './FilterPostsMenu.module.scss';

const FilterPostsMenu = ({ handleFilterBy }) => {
  return (
    <div>
      <h1>Filter By</h1>
      <div>
        <FilterByDate
          filterCriteria={'date'}
          value={'date'}
          handleFilterBy={handleFilterBy}
        />
        <FilterByTags
          filterCriteria={'tags'}
          handleFilterBy={handleFilterBy}
        />
      </div>
    </div>
  );
}

FilterPostsMenu.propTypes = {
  handleFilterBy: PropTypes.func
}

export default FilterPostsMenu;
