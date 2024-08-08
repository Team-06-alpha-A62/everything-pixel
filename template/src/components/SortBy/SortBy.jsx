import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './SortBy.module.scss';

function SortBy({ sort, values }) {
  const [showOptions, setShowOptions] = useState(false);
  const [activeSort, setActiveSort] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const toggleShowOptions = () => {
    setShowOptions(prevShowOptions => !prevShowOptions);
  };

  const handleClickedValueChange = value => {
    let newActiveSort = activeSort === value ? '' : value;
    setActiveSort(newActiveSort);
    if (newActiveSort) {
      searchParams.set(
        `sortBy${sort.slice(0, 1).toUpperCase() + sort.slice(1)}`,
        newActiveSort
      );
    } else {
      searchParams.delete(
        `sortBy${sort.slice(0, 1).toUpperCase() + sort.slice(1)}`
      );
    }
    navigate({ search: searchParams.toString() });
  };

  return (
    <div className={styles.sortBy}>
      <div className={styles.sortByHeader} onClick={toggleShowOptions}>
        <span className={styles.sortByTitle}>{sort}</span>
        <FontAwesomeIcon
          icon={showOptions ? faSortUp : faSortDown}
          className={styles.sortByIcon}
        />
      </div>
      {showOptions && (
        <div className={styles.sortByItems}>
          {values.map(value => (
            <div
              className={`${styles.sortByItem} ${
                activeSort === value ? styles.active : ''
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
  handleSortBy: PropTypes.func,
};

export default SortBy;
