import styles from './Vacancies.module.scss';
import { useEffect, useState } from 'react';
import { VacanciesProps, VacancyResponseProps } from '../../utils/interfaces';
import { API_PATH } from '../../utils/constValues';
import SingleVacancy from '../SingleVacancy/SingleVacancy';
import { Pagination } from '@mantine/core';
import VacancySkeleton from '../Skeleton/VacancySkeleton/VacancySkeleton';
import notFound from '../../assets/notFound.svg';
import $api from '../../utils/http/axios';

export default function Vacancies(props: VacanciesProps) {
  const [activePage, setPage] = useState(1);
  const [isRerender, setIsRerender] = useState(false);

  const [data, setData] = useState<VacancyResponseProps>({
    objects: [],
    total: 0,
  });

  useEffect(() => {
    setIsRerender(true);
    $api
      .get(
        API_PATH.vacancies +
          `?page=${activePage - 1}&count=4&published=1&keyword=${
            props.searchValue
          }&payment_from=${props.filterValue.from}&payment_to=${
            props.filterValue.to
          }&no_agreement=${
            props.filterValue.from == '' && props.filterValue.to == '' ? 0 : 1
          }${
            +props.filterValue.industry == 0
              ? ``
              : `&catalogues=${Number(props.filterValue.industry)}`
          }`
      )
      .then((res) => setData(res.data))
      .then(() => setIsRerender(false))
      .catch((err) => console.log(err));
  }, [
    activePage,
    props.filterValue.from,
    props.filterValue.industry,
    props.filterValue.to,
    props.searchValue,
  ]);

  return (
    <div className={styles.wrapper}>
      {!isRerender
        ? data.objects.map((_item, index) => {
            return <SingleVacancy key={index} objects={data.objects[index]} />;
          })
        : [0, 0, 0, 0].map((_item, index) => {
            return <VacancySkeleton key={index} />;
          })}
      {!data.objects.length && !isRerender && (
        <div className={styles.notFound}>
          <img src={notFound} />
          <div className={styles.text}>Упс, здесь еще ничего нет!</div>
        </div>
      )}
      <Pagination
        className={styles.pagination}
        value={activePage > Math.ceil(data.total / 4) ? 1 : activePage}
        onChange={(value) => setPage(value)}
        total={data.total > 500 ? 125 : Math.ceil(data.total / 4)}
      />
    </div>
  );
}
