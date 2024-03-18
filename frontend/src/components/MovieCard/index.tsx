import { Movie } from 'types/movie';

import './styles.css';
import { Link } from 'react-router-dom';



type Props = {
    movie: Movie;
}

const MovieCard = ( { movie } : Props) => {

    return (
        <Link to={`/details/${movie.id}/reviews`}>
        <div className="base-card movie-card">
            <div className="card-top-container">
                <img className="image" src={movie.imgUrl} alt={movie.title} />
            </div>
            <div className="card-bottom-container">
                <h3>{movie.title}</h3>
                <h5>{movie.year}</h5>
                <h6>{movie.subTitle}</h6>
            </div>
        </div>
        </Link>
    );
}

export default MovieCard;