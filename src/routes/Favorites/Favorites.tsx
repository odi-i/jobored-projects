import { useEffect, useState } from 'react';
import styles from './Favorites.module.scss';
import { API_PATH, DATA } from '../../utils/constValues';
import { VacancyResponseProps } from '../../utils/interfaces';
import SingleVacancy from '../../components/SingleVacancy/SingleVacancy';
import { Pagination } from '@mantine/core';
import notFound from '../../assets/notFound.svg';
import VacancySkeleton from '../../components/Skeleton/VacancySkeleton/VacancySkeleton';
import $api from '../../utils/http/axios';

export default function Favorites() {
  const [activePage, setPage] = useState(1);
  const [isFavoritesChange, setIsFavoritesChange] = useState(false);
  const [isRerender, setIsRerender] = useState(false);
  const [data, setData] = useState<VacancyResponseProps>({
    objects: [],
    total: 0,
  });
  const [favorites, setFavorites] = useState<number[]>(
    localStorage.getItem(DATA.localeFavor) == null
      ? []
      : JSON.parse(localStorage.getItem(DATA.localeFavor) || '[]')
  );

  useEffect(() => {
    const newArr =
      localStorage.getItem(DATA.localeFavor) == null
        ? []
        : JSON.parse(localStorage.getItem(DATA.localeFavor) || '[]');
    if (newArr.length == favorites.length - 1 && newArr.length % 4 == 0)
      setPage((v) => v - 1);
    setFavorites(newArr);
  }, [isFavoritesChange]);

  useEffect(() => {
    if (!(favorites.length == 0)) {
      setIsRerender(true);
      let idArr = '';
      favorites.forEach((item, index) => {
        if (index != 0) idArr += '&';
        idArr += `ids[]=${item}`;
      });

      $api
        .get(
          API_PATH.vacancies +
            `?page=${activePage - 1}&count=4&published=1&` +
            idArr
        )
        .then((res) => setData(res.data))
        .then(() => setIsRerender(false))
        .catch((err) => console.log(err));
    } else {
      setData({ objects: [], total: 0 });
    }
  }, [activePage, favorites]);

  window.addEventListener('custom-storage-event-name', () =>
    setIsFavoritesChange((v) => !v)
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.cards}>
        {!isRerender && favorites.length && data.total == favorites.length
          ? data.objects.map((_item, index) => {
              return (
                <SingleVacancy key={index} objects={data.objects[index]} />
              );
            })
          : favorites
              .slice(4 * (activePage - 1), 4 * activePage)
              .map((_item, index) => {
                return <VacancySkeleton key={index} />;
              })}
        {!data.objects.length && !isRerender && (
          <div className={styles.notFound}>
            <img src={notFound} />
            <div className={styles.text}>Упс, здесь еще ничего нет!</div>
          </div>
        )}
      </div>
      <Pagination
        className={styles.pagination}
        value={activePage}
        onChange={(value) => setPage(value)}
        total={data.total > 500 ? 125 : Math.ceil(data.total / 4)}
      />
    </div>
  );
}
