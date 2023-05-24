import { Dispatch } from 'react';

export interface FiltersProps {
  setForm: Dispatch<{ industry: string; from: string; to: string }>;
  isReset: boolean;
  setIsReset: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SelectDataProps {
  value: string;
  label: string;
}

export interface SearchBarProps {
  setSearch: Dispatch<string>;
  isReset: boolean;
}

export interface CataloguesDataProps {
  title_rus: string;
  key: number;
}

export interface VacanciesProps {
  filterValue: { industry: string; from: string; to: string };
  searchValue: string;
}

export interface VacancyResponseProps {
  objects: ObjectProps[];
  total: number;
}

export interface ObjectProps {
  id: number;
  profession: string;
  firm_name: string;
  town: {
    title: string;
  };
  type_of_work: {
    title: string;
  };
  payment_to: number;
  payment_from: number;
  currency: string;
  vacancyRichText: string | TrustedHTML;
}
