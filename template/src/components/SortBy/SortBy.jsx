import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './SortBy.module.scss';

function SortBy({ sort, values, activeSort, onSortChange }) {
  const [showOptions, setShowOptions] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const toggleShowOptions = () => {
    setShowOptions(prevShowOptions => !prevShowOptions);
  };

  const handleClickedValueChange = value => {
    const newSortValue = activeSort.value === value ? '' : value;
    onSortChange(sort, newSortValue);

    // Update URL params
    searchParams.delete('sortByDate');
    searchParams.delete('sortByPopularity');
    searchParams.delete('sortByTitle');

    if (newSortValue) {
      searchParams.set(
        `sortBy${sort.slice(0, 1).toUpperCase() + sort.slice(1)}`,
        newSortValue
      );
    }

    navigate({ search: searchParams.toString() });
  };

  return (
    <div className={styles['sort-by']}>
      <div className={styles['sort-by-header']} onClick={toggleShowOptions}>
        <h4 className={styles['sort-by-title']}>{sort}</h4>
        <FontAwesomeIcon
          icon={showOptions ? faSortUp : faSortDown}
          className={styles['sort-by-icon']}
        />
      </div>
      {showOptions && (
        <div className={styles['sort-by-items']}>
          {values.map(value => (
            <div
              className={`${styles['sort-by-item']} ${
                activeSort.sortType === sort && activeSort.value === value ? styles.active : ''
              }`}
              key={value}
              onClickCapture={() => {
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
  activeSort: PropTypes.object.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default SortBy;
