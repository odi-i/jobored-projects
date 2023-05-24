import styles from './SingleVacancy.module.scss';
import { ObjectProps } from '../../utils/interfaces';
import dot from '../../assets/dot.svg';
import place from '../../assets/place.svg';
import star from '../../assets/star.svg';
import hoverStar from '../../assets/hoverStar.svg';
import activeStar from '../../assets/activeStar.svg';
import { useState } from 'react';
import { DATA } from '../../utils/constValues';
import { Link } from 'react-router-dom';

export default function SingleVacancy({ objects }: { objects: ObjectProps }) {
  const [isHover, setIsHover] = useState(false);
  const [favorites, setFavorites] = useState<number[]>(
    localStorage.getItem(DATA.localeFavor) == null
      ? []
      : JSON.parse(localStorage.getItem(DATA.localeFavor) || '[]')
  );

  const removeFavor = () => {
    window.dispatchEvent(new Event('custom-storage-event-name'));

    const arr = JSON.parse(
      localStorage.getItem(DATA.localeFavor) || '[]'
    ).filter((item: number) => item !== objects.id);
    setFavorites(arr);
    localStorage.setItem(DATA.localeFavor, JSON.stringify(arr));
  };

  const addFavor = () => {
    window.dispatchEvent(new Event('custom-storage-event-name'));

    const arr = [
      ...JSON.parse(localStorage.getItem(DATA.localeFavor) || '[]'),
      objects.id,
    ];
    setFavorites(arr);
    localStorage.setItem(DATA.localeFavor, JSON.stringify(arr));
  };

  const displayMoney = () => {
    if (objects.payment_to == 0 && objects.payment_from == 0)
      return 'з/п не указана';
    else if (objects.payment_to == objects.payment_from) {
      return `з/п ${objects.payment_to} ${objects.currency}`;
    } else if (objects.payment_from != 0 && objects.payment_to == 0) {
      return `з/п от ${objects.payment_from} ${objects.currency}`;
    } else if (objects.payment_from < objects.payment_to) {
      return `з/п ${objects.payment_from} - ${objects.payment_to} ${objects.currency}`;
    }
  };

  const handleStar = () => {
    favorites.includes(objects.id) ? removeFavor() : addFavor();
    setIsHover(false);
  };

  const changeImg = () => {
    if (favorites.includes(objects.id)) {
      return activeStar;
    }
    if (isHover) return hoverStar;
    return star;
  };

  return (
    <div className={styles.wrapper} data-elem={`vacancy-${objects.id}`}>
      <div className={styles.main}>
        <Link to={`/vacancy/${objects.id}`} className={styles.profession}>
          {objects.profession}
        </Link>
        <div className={styles.conditions}>
          <div className={styles.money}>{displayMoney()}</div>
          <img src={dot} />
          <div className={styles.type_of_work}>
            {objects.type_of_work?.title == undefined
              ? ''
              : objects.type_of_work.title}
          </div>
        </div>
        <div className={styles.place}>
          <img src={place} />
          <div className={styles.town}>
            {objects.town?.title == undefined ? '' : objects.town.title}
          </div>
        </div>
      </div>
      <img
        data-elem={`vacancy-${objects.id}-shortlist-button`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={styles.star}
        src={changeImg()}
        onClick={handleStar}
      />
    </div>
  );
}
