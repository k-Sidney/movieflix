import './styles.css';
import { Review } from 'types/review';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { useEffect, useState } from 'react';
import { hasAnyRoles } from 'util/auth';
import { useParams } from 'react-router-dom';
import ReviewForm from 'components/ReviewForm';
import StarImg from 'assets/images/star.png';
import MovieDetailsCard from 'components/MovieDetailsCard';

type urlParams = {
  movieId: string;
};

const Details = () => {
  const { movieId } = useParams<urlParams>();

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
      params: {
        page: 0,
        size: 12,
      },
    };
    requestBackend(config).then((response) => {
      console.log(response.data);
      setReviews(response.data);
    });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  };

  return (
    <div className="main-container-details">
      <MovieDetailsCard />
      {hasAnyRoles(['ROLE_MEMBER']) && (
        <div className="Avaliação">
          <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
        </div>
      )}
      <div className="reviews-card">
        {reviews.map((item) => (
          <div key={item.id} className="review-card">
            <div key={item.id} className="username-container">
              <div key={item.id} className="img-container">
                <img key={item.id} src={StarImg} alt="Estrela" />
              </div>
              <div key={item.id} className="name-container">
                <h4 key={item.id}>{item.user.name}</h4>
              </div>
            </div>
            <div key={item.id} className="review-text-container">
              <p key={item.id}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
