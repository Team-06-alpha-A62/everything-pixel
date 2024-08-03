import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PropTypes from 'prop-types';

function SortBy({ sort, values, handleSortBy }) {
  const [showMore, setShowMore] = useState(false);
  const [clickedValue, setClickedValue] = useState('');

  const toggleShowMore = () => {
    setShowMore(prevShowMore => !prevShowMore);
  };

  const handleClickedValueChange = value => {
    value === clickedValue ? setClickedValue(null) : setClickedValue(value);
  };

  return (
    <div>
      <span>{sort}</span>
      <FontAwesomeIcon onClick={toggleShowMore} icon={faSortDown} />
      {showMore && (
        <div>
          {values.map(value => (
            <div
              className={clickedValue === value ? 'active' : ''}
              key={value}
              onClickCapture={() => {
                handleSortBy(value);
                handleClickedValueChange(value);
              }}
            >
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
SortBy.propTypes = {
  sort: PropTypes.string.isRequired,
  values: PropTypes.array,
  handleSortBy: PropTypes.func,
};
export default SortBy;
