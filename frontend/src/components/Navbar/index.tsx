import { AuthContext } from 'AuthContext';
import './styles.css';
import 'bootstrap/js/src/collapse.js';
import { useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';
import history from 'util/history';
import { getTokenData, isAuthenticated } from 'util/auth';
import { removeAuthData } from 'util/storage';

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="navbar bg-primary main-nav">
      <div className="container-fluid">
        <Link to="/" className="nav-logo-text">
          <h4>MovieFlix</h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#movieflix-navbar"
          aria-controls="movieflix-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="nav-login-logout">
          {authContextData.authenticated ? (
            <div className="nav-logout">
              <a href="#Logout" onClick={handleLogoutClick}>
                SAIR
              </a>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
