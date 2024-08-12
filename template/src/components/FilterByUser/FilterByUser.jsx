import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './FilterByUser.module.scss';
import { useAuth } from '../../providers/useAuth.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import Button from '../../hoc/Button/Button.jsx';

const FilterByUser = () => {
  const { currentUser } = useAuth();
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showMore, setShowMore] = useState(true);

  const toggleShowMore = () => {
    setShowMore(showMore => !showMore);
  };

  const followingUsers = Object.keys(currentUser.userData?.following ?? {});

  const handleInputChange = e => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const results = followingUsers
        .filter(item => item.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setFilteredData(results);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSelectItem = value => {
    setQuery(value);
    setIsOpen(false);

    value
      ? searchParams.set('filterByUser', value)
      : searchParams.delete('filterByUser');

    navigate({ search: searchParams.toString() });
  };

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleClearFilterClick = () => {
    setQuery('');
    searchParams.delete('filterByUser');
    navigate({ search: searchParams.toString() });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles['filter-by']} ref={dropdownRef}>
      <div className={styles['filter-by-header']} onClick={toggleShowMore}>
        <h4 htmlFor="follower">Follower</h4>
        <FontAwesomeIcon
          className={styles['filter-by-icon']}
          onClick={toggleShowMore}
          icon={showMore ? faSortUp : faSortDown}
        />
      </div>
      {showMore && (
        <>
          <input
            name="follower"
            id="follower"
            type="text"
            value={query}
            onChange={handleInputChange}
            className={styles.input}
          />
          {isOpen && filteredData.length > 0 && (
            <ul className={styles.dropdownMenu}>
              {filteredData.map((item, index) => (
                <li
                  key={index}
                  className={styles.dropdownItem}
                  onClick={() => handleSelectItem(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
          {searchParams.get('filterByUser') && (
            <div>
              <Button handleClick={handleClearFilterClick} style="primary">
                Clear
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FilterByUser;
