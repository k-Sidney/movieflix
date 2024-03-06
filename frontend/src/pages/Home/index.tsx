import { ReactComponent as MainImage } from 'assets/images/home-img.svg';
import ButtonIcon from 'components/ButtonIcon';
//import { Link } from 'react-router-dom';

import './styles.css';
import { useForm } from 'react-hook-form';
import { requestBackendLogin } from 'util/requests';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from 'AuthContext';
import { saveAuthData } from 'util/storage';
import { getTokenData } from 'util/auth';
//import { error } from 'console';

type FormData = {
  username: string;
  password: string;
};

const Home = () => {
  const { setAuthContextData } = useContext(AuthContext);

  const { register, handleSubmit } = useForm<FormData>();

  const history = useHistory();

  const onsubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        history.push('/movies');
      })
      .catch((error) => {
        console.log('ERRO', error);
      });
  };

  return (
    <div className="home-container">
      <div className="home-image-container">
        <h1>Avalie Filmes</h1>
        <p>Diga o que você achou do seu filme favorito</p>
        <MainImage />
      </div>

      <div className="home-login-container">
        <div className="login-box">
          <h1>LOGIN</h1>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div className=" mb-3">
              <input
                {...register('username')}
                type="text"
                className="form-control base-input input-box"
                placeholder="Email"
                name="username"
              />
            </div>
            <div className=" mb-3">
              <input
                {...register('password')}
                type="password"
                className="form-control base-input input-box"
                placeholder="Senha"
                name="password"
              />
            </div>

            <div className="login-submit">
              <ButtonIcon text="Fazer login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
