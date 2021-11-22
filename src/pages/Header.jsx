import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isLoading: true,
    };
    this.exibNamePerfil = this.exibNamePerfil.bind(this);
  }

  componentDidMount() {
    this.exibNamePerfil();
  }

  async exibNamePerfil() {
    const promise = await getUser();
    if (promise) {
      this.setState({
        name: promise.name,
        isLoading: false,
      });
    }
  }

  render() {
    const { name, isLoading } = this.state;

    return (
      <header data-testid="header-component">
        <h1>Bem-vindo(a):</h1>

        {isLoading ? (
          <Loading />
        ) : (
          <h2 data-testid="header-user-name">{`${name}`}</h2>
        )}
      </header>
    );
  }
}
