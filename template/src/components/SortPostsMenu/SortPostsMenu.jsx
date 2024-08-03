import SortBy from '../SortBy/SortBy';
import PropTypes from 'prop-types';
function SortPostsMenu({ onSortByClick }) {
  return (
    <div>
      <h1>SortBy</h1>
      <div>
        <SortBy
          sort={'date'}
          values={['newest', 'oldest']}
          handleSort={onSortByClick}
        />
        <SortBy
          sort={'popularity'}
          values={['most', 'least']}
          handleSort={onSortByClick}
        />
        <SortBy
          sort={'title'}
          values={['A-Z', 'Z-A']}
          handleSort={onSortByClick}
        />
      </div>
    </div>
  );
}
SortPostsMenu.propTypes = {
  onSortByClick: PropTypes.func,
};
export default SortPostsMenu;
