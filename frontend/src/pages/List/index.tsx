
import './styles.css';
import { Movie } from 'types/movie';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { useCallback, useEffect, useState } from 'react';
import { SpringPage } from 'types/vendor/spring';
import MovieCard from 'components/MovieCard';
import MovieFilter, { MovieFilterData } from 'components/MovieFilter';
import Pagination from 'components/Pagination';

type ControlComponentsData = {
  activePage: number;
  filterData: MovieFilterData;
};

const List = () => {

  const [page, setPage] = useState<SpringPage<Movie>>();

  const [controlComponentsData, setControlComponentsData] =
  useState<ControlComponentsData>({
    activePage: 0,
    filterData: { name: '', genre: null },
  });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({ activePage: pageNumber, filterData: controlComponentsData.filterData });
  };

  const handleSubmitFilter = (data: MovieFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data});
  };

  const getMovies = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies?sort=title',
      withCredentials: true,
      

      params: {
        page: controlComponentsData.activePage,
        size: 4,
        name: controlComponentsData.filterData.name,
        genreId: controlComponentsData.filterData.genre?.id,
        
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
      console.log(page);
    });
  } ,[controlComponentsData]);


  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="main-container">
      <div className="title-container">
      <MovieFilter onSubmitFilter={handleSubmitFilter} />
      </div>
      <div className="container-list">
      <div className="row list-row">
        {page?.content.map((movie) => (
          <div key={movie.id} className="col-sm-6 col-md-6 col-lg-6 col-xl-3 movie-list">
            <MovieCard
              movie={movie}
            />
          </div>
        ))}
      </div>
      </div>
      <div className="row pagination-container">
        <Pagination
          pageCount={page ? page.totalPages : 0}
          range={3}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default List;
