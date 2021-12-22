import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      name: '',
      email: '',
      image: '',
      description: '',
    };
    this.profileUser = this.profileUser.bind(this);
  }

  componentDidMount() {
    this.profileUser();
  }

  async profileUser() {
    this.setState({ isLoading: true });
    const response = await getUser();
    this.setState({
      isLoading: false,
      name: response.name,
      email: response.email,
      image: response.image,
      description: response.description,
    });
  }

  render() {
    const {
      isLoading,
      image,
      name,
      email,
      description } = this.state;

    return (
      <>
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <div data-testid="page-profile">
            <img data-testid="profile-image" src={ image } alt="foto do perfil" />
            <p>{name}</p>
            <p>{email}</p>
            <p>{description}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </>
    );
  }
}
