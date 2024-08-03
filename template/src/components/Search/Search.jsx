import { useSearchParams } from 'react-router-dom';
import styles from './Search.module.scss';
import PropTypes from 'prop-types';
function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';

  const handleSearchQueryChange = e => {
    const query = e.target.value;
    setSearchParams({ search: query });
  };

  return (
    <div className={styles.searchContainer}>
      <input type="text" value={search} onChange={handleSearchQueryChange} />
    </div>
  );
}

Search.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchQueryChange: PropTypes.func,
};

export default Search;
