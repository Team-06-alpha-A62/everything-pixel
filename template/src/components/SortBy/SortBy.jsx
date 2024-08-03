import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PropTypes from 'prop-types';

function SortBy({ sort, values, handleSortBy }) {
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
            <div
              key={value}
              onClickCapture={() => {
                handleSortBy(value);
                handleToggle(value);
              }}
            >
              <label htmlFor={value}>
                {value}
                <input
                  name={value}
                  id={value}
                  type="checkbox"
                  checked={checkedValues[value] || false}
                  onChange={() => handleToggle(value)}
                />
              </label>
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
