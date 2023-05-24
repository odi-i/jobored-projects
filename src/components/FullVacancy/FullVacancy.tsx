import styles from './FullVacancy.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_PATH } from '../../utils/constValues';
import { ObjectProps } from '../../utils/interfaces';
import SingleVacancy from '../SingleVacancy/SingleVacancy';
import VacancySkeleton from '../Skeleton/VacancySkeleton/VacancySkeleton';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import $api from '../../utils/http/axios';

export default function FullVacancy() {
  const { id } = useParams();
  const [data, setData] = useState<ObjectProps>();

  useEffect(() => {
    $api
      .get(API_PATH.vacancies + `${id}/`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.wrapper}>
      {data ? <SingleVacancy objects={data} /> : <VacancySkeleton />}
      {data ? (
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: data?.vacancyRichText || '' }}
        ></div>
      ) : (
        <div className={styles.text}>
          <Skeleton width={725} height={500} />
        </div>
      )}
    </div>
  );
}
