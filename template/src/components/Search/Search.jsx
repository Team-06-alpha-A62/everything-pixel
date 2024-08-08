import { useSearchParams } from 'react-router-dom';
import styles from './Search.module.scss';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';

  const handleSearchQueryChange = e => {
    const query = e.target.value;
    setSearchParams({ search: query });
  };

  return (
    <div className={styles['search-container']}>
      <input type="text" value={search} onChange={handleSearchQueryChange} placeholder='Search...'/>
    </div>
  );
}

export default Search;
