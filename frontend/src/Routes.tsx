import { Router, Switch, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Navbar from 'components/Navbar';
import List from 'pages/List';
import Details from 'pages/Details';
import history from 'util/history';

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/movies" exact>
        <List />
      </Route>
      <Route path="/movies/:movieId">
        <Details />
      </Route>
      <Route path="/details">
        <Details />
      </Route>
    </Switch>
  </Router>
);

export default Routes;
