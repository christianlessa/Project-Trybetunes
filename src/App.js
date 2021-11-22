import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Loading from './pages/Loading';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact patch="/" component={ Login } />
          <Route patch="/search" component={ Search } />
          <Route patch="/album/:id" component={ Album } />
          <Route patch="/favorites" component={ Favorites } />
          <Route patch="/profile" component={ Profile } />
          <Route patch="/profile/edit" component={ ProfileEdit } />
          <Route patch="*" component={ NotFound } />
          <Route patch="/loading" component={ Loading } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
