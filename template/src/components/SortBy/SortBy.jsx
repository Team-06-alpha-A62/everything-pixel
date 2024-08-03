import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PropTypes from 'prop-types';
function SortBy({ sort, values, handleSort }) {
  const [showMore, setShowMore] = useState(false);
  const [checkedValues, setCheckedValues] = useState({});

  const toggleShowMore = () => {
    setShowMore(prevShowMore => !prevShowMore);
  };

  const handleToggle = value => {
    setCheckedValues(prevCheckedValues => ({
      ...prevCheckedValues,
      [value]: !prevCheckedValues[value],
    }));
  };

  return (
    <div>
      <p>{sort}</p>
      <FontAwesomeIcon onClick={toggleShowMore} icon={faSortDown} />
      {showMore && (
        <div>
          {values.map(value => (
            <div key={value} onClick={() => handleSort(value)}>
              <p>{value}</p>
              <input
                type="checkbox"
                checked={checkedValues[value] || false}
                onChange={() => handleToggle(value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
SortBy.propTypes = {
  sort: PropTypes.string.isRequired,
  values: PropTypes.array[PropTypes.string].isRequired,
  handleSort: PropTypes.func,
};
export default SortBy;
