import SortBy from '../SortBy/SortBy';
import PropTypes from 'prop-types';
function SortPostsMenu() {
  return (
    <div>
      <h1>SortBy</h1>
      <div>
        <SortBy sort={'date'} values={['newest', 'oldest']} />
        <SortBy sort={'popularity'} values={['most', 'least']} />
        <SortBy sort={'title'} values={['A-Z', 'Z-A']} />
      </div>
    </div>
  );
}
SortPostsMenu.propTypes = {
  handleSortBy: PropTypes.func,
};
export default SortPostsMenu;
