import SortBy from '../SortBy/SortBy';
import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SortPostsMenu.module.scss';

function SortPostsMenu() {
  const [activeSort, setActiveSort] = useState({ sortType: '', value: '' });

  const handleSortChange = (sortType, value) => {
    if (activeSort.sortType === sortType && activeSort.value === value) {
      setActiveSort({ sortType: '', value: '' });
    } else {
      setActiveSort({ sortType, value });
    }
  };

  return (
    <div>
      <h2 className={styles['sort-posts-menu-header']}>Sort By</h2>
      <div>
        <SortBy
          sort="date"
          values={['newest', 'oldest']}
          activeSort={activeSort}
          onSortChange={handleSortChange}
        />
        <SortBy
          sort="popularity"
          values={['most', 'least']}
          activeSort={activeSort}
          onSortChange={handleSortChange}
        />
        <SortBy
          sort="title"
          values={['A-Z', 'Z-A']}
          activeSort={activeSort}
          onSortChange={handleSortChange}
        />
      </div>
    </div>
  );
}

SortPostsMenu.propTypes = {
  handleSortBy: PropTypes.func,
};

export default SortPostsMenu;
