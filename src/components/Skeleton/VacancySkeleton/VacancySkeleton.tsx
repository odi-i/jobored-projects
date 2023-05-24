import styles from './VacancySkeleton.module.scss';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function VacancySkeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.profession}>
          <Skeleton width={500} />
        </div>
        <div className={styles.conditions}>
          <div className={styles.money}>
            <Skeleton width={150} />
          </div>
          <Skeleton circle width={10} height={10} />
          <div className={styles.type_of_work}>
            <Skeleton width={150} />
          </div>
        </div>
        <div className={styles.place}>
          <Skeleton width={20} height={20} />
          <div className={styles.town}>
            <Skeleton width={150} />
          </div>
        </div>
      </div>
      <Skeleton width={25} height={25} />
    </div>
  );
}
