import { Genre } from 'types/genre';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';

import './styles.css';
import { AxiosRequestConfig } from 'axios';

export type MovieFilterData = {
  name: string;
  genre: Genre | null;
};

type Props = {
  onSubmitFilter: (data: MovieFilterData) => void;
};

const MovieFilter = ({ onSubmitFilter }: Props) => {
  const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

  const { handleSubmit, setValue, getValues, control } =
    useForm<MovieFilterData>();

  const onSubmit = (formData: MovieFilterData) => {
    console.log("Enviou", formData)
    onSubmitFilter(formData);
  };

  const handleChangeGenre = (value: Genre) => {
    setValue('genre', value);
    const obj: MovieFilterData = {
      name: getValues('name'),
      genre: getValues('genre'),
    };
    console.log("Enviou", obj);
    onSubmitFilter(obj);
  };

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/genres',
      withCredentials: true,
    };
    requestBackend(config).then((response) => {
      setSelectGenres(response.data);
    });
  }, []);

  return (
    <div className="product-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="product-filter-form">
          <div className="product-filter-genner-container">
            <Controller
              name="genre"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectGenres}
                  isClearable
                  placeholder="Gênero"
                  classNamePrefix={'movie-filter-select'}
                  onChange={(value) => handleChangeGenre(value as Genre)}
                  getOptionLabel={(genre: Genre) => genre.name}
                  getOptionValue={(genre: Genre) => String(genre.id)}
                />
              )}
            />
        </div>
      </form>
    </div>
  );
};

export default MovieFilter;
