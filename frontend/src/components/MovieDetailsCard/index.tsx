import { AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { requestBackend } from 'util/requests';


import './styles.css';
import { Movie } from 'types/movie';

type UrlParams = {
  movieId: string;
};

const MovieDetailsCard = () => {
  const { movieId } = useParams<UrlParams>();

  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
        method: 'GET',
        url: `/movies/${movieId}`,
        withCredentials: true};
        requestBackend(params).then((response) => {
        setMovie(response.data);
      })
  }, [movieId]);

  return (
    <div className="base-card movie-card-details">
        <div className="card-top-container-details">
            <img src={movie?.imgUrl} alt={movie?.title} />
        </div>
        <div className="card-bottom-container-details">
            <h3>{movie?.title}</h3>
            <h5>{movie?.year}</h5>
            <h6>{movie?.subTitle}</h6>
            <p>{movie?.synopsis}</p>
        </div>
    </div>

);
}

export default MovieDetailsCard;