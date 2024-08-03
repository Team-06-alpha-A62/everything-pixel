import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useState } from 'react';

const FilterByDate = ({ filterCriteria, value, handleFilterBy }) => {
  const [showMore, setShowMore] = useState(false);
  const [filterDate, setFilterDate] = useState('');

  const toggleShowMore = () => {
    setShowMore(showMore => !showMore);
  };

  const handleDateChange = value => {
    setFilterDate(value);

    const dateObject = new Date(value);
    console.log(filterCriteria);
    handleFilterBy(filterCriteria, dateObject.getTime()); // timestamp
  }

  return (
    <div>
      <label htmlFor={value}>{filterCriteria}</label>
      <FontAwesomeIcon onClick={toggleShowMore} icon={showMore ? faSortUp : faSortDown} />
      {showMore && (
        <>
          <br />
          <input
            value={filterDate}
            type={value}
            id={value}
            name={value}
            onChange={e => handleDateChange(e.target.value)}
          />
        </>
      )}
    </div>
  );
};

FilterByDate.propTypes = {
  filterCriteria: PropTypes.string,
  value: PropTypes.string,
  handleFilterBy: PropTypes.func
};

export default FilterByDate;
