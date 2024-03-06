import { Link } from 'react-router-dom';

import './styles.css';
import { Movie } from 'types/movie';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { useEffect, useState } from 'react';
import { SpringPage } from 'types/vendor/spring';

const List = () => {
  //FORMA INCORRETA
  //let movie : Movie;

  //FORMA INCORRETA

  const [page, setPage] = useState<SpringPage<Movie>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true,
      params: {
        page: 0,
        size: 2,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
      console.log(page);
    });
  }, []);

  /*axios.get(BASE_URL + "/movies/1" )
  .then(response  => {
    console.log(response.data)
  });*/

  /* const movie = {
    id: 1,
    title: 'Bob Esponja',
    subTitle: 'O Incrível Resgate',
    year: 2020,
    imgUrl:
      'https://image.tmdb.org/t/p/w533_and_h300_bestv2/wu1uilmhM4TdluKi2ytfz8gidHf.jpg',
    synopsis:
      'Onde está Gary? Segundo Bob Esponja, Gary foi "caracolstrado" pelo temível Rei Poseidon e levado para a cidade perdida de Atlantic City. Junto a Patrick Estrela, ele sai em uma missão de resgate ao querido amigo, e nesta jornada os dois vão conhecer novos personagens e viver inimagináveis aventuras.',
    genre: {
      id: 1,
      name: 'Comédia',
    },
  };*/

  return (
    <div className="main-container">
      <div className="title-container">
        <h1>Tela listagem de filmes</h1>
      </div>
      <div className="container-list">
        <Link to="/movies/1">
          <h1>Acessar /movies/1</h1>
        </Link>
        <Link to="/movies/2">
          <h1>Acessar /movies/2</h1>
        </Link>
      </div>
    </div>
  );
};

export default List;
