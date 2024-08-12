import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './FilterByDate.module.scss';

const FilterByDate = ({ filterCriteria, value }) => {
  const [showMore, setShowMore] = useState(true);
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
    <div className={styles['filter-by']}>
      <div className={styles['filter-by-header']} onClick={toggleShowMore}>
        <h4 htmlFor={value}>{filterCriteria}</h4>
        <FontAwesomeIcon
          className={styles['filter-by-icon']}
          onClick={toggleShowMore}
          icon={showMore ? faSortUp : faSortDown}
        />
      </div>
      {showMore && (
        <>
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
