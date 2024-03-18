/* eslint-disable no-restricted-globals */
import StarImg from 'assets/images/star.png';

import './styles.css';
import { Review } from 'types/review';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

type urlParams = {
  movieId: string;
};

const ReviewCard = () => {


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
      }
    };
    requestBackend(config).then((response) => {
      console.log(response.data);
      setReviews(response.data);
      
    });
  }, [movieId]);

  return (
    <>
    { reviews.map ((item) => (
    <div key={item.id} className="review-card">
      <div key={item.id} className="username-container">
        <div key={item.id} className="img-container">
          <img key={item.id} src={StarImg} alt="Estrela" />
        </div>
        <div  key={item.id} className="name-container">
          <h4  key={item.id}>{item.user.name}</h4>
        </div>
      </div>
      <div key={item.id} className="review-text-container">
        <p key={item.id} className="breakAll">{item.text}</p>
      </div>
    </div>
    ))}
    </>
  );
};

export default ReviewCard;
