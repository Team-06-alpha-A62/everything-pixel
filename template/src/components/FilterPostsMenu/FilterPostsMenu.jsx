import FilterByDate from '../FilterByDate/FilterByDate.jsx';
import FilterByTags from '../FilterByTags/FilterByTags.jsx';
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
          handleFilterBy={handleFilterBy}
        />
      </div>
    </div>
  );
}

export default FilterPostsMenu;
