import styles from './Search.module.scss';
import { useEffect, useState } from 'react';
import Filters from '../../components/Filters/Filters';
import SearchBar from '../../components/SearchBar/SearchBar';
import Vacancies from '../../components/Vacancies/Vacancies';

export default function Search() {
  const [filters, setFilters] = useState({ industry: '', from: '', to: '' });
  const [search, setSearch] = useState('');
  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    setFilters({ industry: '', from: '', to: '' });
    setSearch('');
  }, [isReset]);

  return (
    <>
      <div className={styles.wrapper}>
        <Filters
          setForm={setFilters}
          isReset={isReset}
          setIsReset={setIsReset}
        />
        <div className={styles.main}>
          <SearchBar isReset={isReset} setSearch={setSearch} />
          <Vacancies filterValue={filters} searchValue={search} />
        </div>
      </div>
    </>
  );
}
