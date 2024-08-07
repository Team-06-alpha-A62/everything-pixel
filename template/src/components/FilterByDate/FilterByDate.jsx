import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FilterByDate = ({ filterCriteria, value }) => {
  const [showMore, setShowMore] = useState(false);
  const [filterDate, setFilterDate] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const toggleShowMore = () => {
    setShowMore(showMore => !showMore);
  };

  const handleDateChange = value => {
    setFilterDate(value);

    value
      ? searchParams.set(
          `filterBy${
            filterCriteria.slice(0, 1).toUpperCase() + filterCriteria.slice(1)
          }`,
          value
        )
      : searchParams.delete(
          `filterBy${
            filterCriteria.slice(0, 1).toUpperCase() + filterCriteria.slice(1)
          }`
        );

    navigate({ search: searchParams.toString() });
  };

  return (
    <div>
      <label htmlFor={value}>{filterCriteria}</label>
      <FontAwesomeIcon
        onClick={toggleShowMore}
        icon={showMore ? faSortUp : faSortDown}
      />
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
  handleFilterBy: PropTypes.func,
};

export default FilterByDate;
