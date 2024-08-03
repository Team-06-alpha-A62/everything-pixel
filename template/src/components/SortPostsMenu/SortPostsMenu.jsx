import SortBy from '../SortBy/SortBy';
import PropTypes from 'prop-types';
function SortPostsMenu({ handleSortBy }) {
  return (
    <div>
      <h1>SortBy</h1>
      <div>
        <SortBy
          sort={'date'}
          values={['newest', 'oldest']}
          handleSortBy={handleSortBy}
        />
        <SortBy
          sort={'popularity'}
          values={['most', 'least']}
          handleSortBy={handleSortBy}
        />
        <SortBy
          sort={'title'}
          values={['A-Z', 'Z-A']}
          handleSortBy={handleSortBy}
        />
      </div>
    </div>
  );
}
SortPostsMenu.propTypes = {
  handleSortBy: PropTypes.func,
};
export default SortPostsMenu;
