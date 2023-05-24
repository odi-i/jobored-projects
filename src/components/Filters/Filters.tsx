import styles from './Filters.module.scss';
import resetImg from '../../assets/reset.svg';
import resetImgHover from '../../assets/resetHover.svg';
import resetImgActive from '../../assets/resetActive.svg';
import { Button, NumberInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { API_PATH } from '../../utils/constValues';
import {
  CataloguesDataProps,
  FiltersProps,
  SelectDataProps,
} from '../../utils/interfaces';
import $api from '../../utils/http/axios';
import dropDown from '../../assets/dropDown.svg';
import dropDownActive from '../../assets/dropDownActive.svg';

export default function Filters(props: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const openFunct = (bool: boolean): void => setIsOpen(bool);
  const [jobArr, setJobArr] = useState<SelectDataProps[]>([]);

  const form = useForm({
    initialValues: {
      industry: '',
      from: '',
      to: '',
    },
  });

  const addJobArr = (res: CataloguesDataProps[]) => {
    let arr: SelectDataProps[] = [];
    res.forEach((item) => {
      arr = [...arr, { label: item.title_rus, value: item.key.toString() }];
    });
    setJobArr(arr);
  };

  useEffect(() => {
    $api
      .get(API_PATH.catalogues)
      .then((res) => res.data)
      .then((res) => addJobArr(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    form.reset();
  }, [props.isReset]);

  const changeImg = () => {
    if (isHover) return resetImgHover;
    if (isActive) return resetImgActive;
    return resetImg;
  };

  const handleButton = () => {
    props.setIsReset((v) => !v);
    setIsHover(false);
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 500);
  };

  const handleText = () => {
    if (isHover) return [styles.text, styles.text_hover].join(' ');
    if (isActive) return [styles.text, styles.text_active].join(' ');
    return styles.text;
  };

  return (
    <>
      <form
        className={styles.wrapper}
        onSubmit={form.onSubmit((values) => props.setForm(values))}
      >
        <div className={styles.topic}>
          <div className={styles.name}>Фильтры</div>
          <div
            className={styles.button}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={handleButton}
          >
            <div className={handleText()}>Сбросить все</div>
            <img src={changeImg()} className={styles.img} />
          </div>
        </div>
        <div className={styles.job}>
          <div className={styles.text}>Отрасль</div>
          <Select
            className={styles.input}
            data-elem="industry-select"
            placeholder="Выберете отрасль"
            {...form.getInputProps('industry')}
            rightSection={
              isOpen == false ? (
                <img src={dropDown} />
              ) : (
                <img src={dropDownActive} />
              )
            }
            size="md"
            radius="md"
            onDropdownOpen={() => openFunct(true)}
            onDropdownClose={() => openFunct(false)}
            data={jobArr}
          />
        </div>
        <div className={styles.salary}>
          <div className={styles.text}>Оклад</div>
          <NumberInput
            placeholder="От"
            data-elem="salary-from-input"
            {...form.getInputProps('from')}
            min={0}
            radius="md"
            size="md"
          />
          <NumberInput
            placeholder="До"
            data-elem="salary-to-input"
            {...form.getInputProps('to')}
            min={0}
            radius="md"
            size="md"
          />
        </div>
        <Button
          data-elem="search-button"
          className={styles.button}
          type="submit"
          radius="md"
          size="md"
        >
          Применить
        </Button>
      </form>
    </>
  );
}
