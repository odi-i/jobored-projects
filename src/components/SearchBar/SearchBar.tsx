import styles from './SearchBar.module.scss';
import { SearchBarProps } from '../../utils/interfaces';
import { Button, Input } from '@mantine/core';
import { useForm } from '@mantine/form';
import searchIcon from '../../assets/search.svg';
import { useEffect } from 'react';

export default function SearchBar(props: SearchBarProps) {
  const form = useForm({
    initialValues: {
      text: '',
    },
  });

  useEffect(() => {
    form.reset();
  }, [props.isReset]);

  return (
    <form onSubmit={form.onSubmit((values) => props.setSearch(values.text))}>
      <Input
        className={styles.input}
        data-elem="search-input"
        icon={<img className={styles.img} src={searchIcon} />}
        placeholder="Введите название вакансии"
        radius="md"
        rightSectionWidth={'107px'}
        iconWidth={'40px'}
        {...form.getInputProps('text')}
        rightSection={
          <Button
            data-elem="search-button"
            className={styles.button}
            type="submit"
          >
            Поиск
          </Button>
        }
      />
    </form>
  );
}
