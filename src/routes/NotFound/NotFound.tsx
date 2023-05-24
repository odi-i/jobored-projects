import styles from './NotFound.module.scss';
import notFound from '../../assets/notFound.svg';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <img src={notFound} />
      <div className={styles.text}>Упс, здесь еще ничего нет!</div>
      <Link to={'/'} className={styles.button}>
        Поиск Вакансий
      </Link>
    </div>
  );
}
