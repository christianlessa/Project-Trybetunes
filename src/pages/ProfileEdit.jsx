import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      updated: false,
      user: {
        name: '',
        email: '',
        image: '',
        description: '',
      },
    };
    this.profileUser = this.profileUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  componentDidMount() {
    this.profileUser();
  }

  handleChange({ target }) {
    const { user } = this.state;
    const { value, name } = target;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  async profileUser() {
    this.setState({ isLoading: true });
    const response = await getUser();
    this.setState({
      isLoading: false,
      user: {
        name: response.name,
        email: response.email,
        image: response.image,
        description: response.description,
      },
    });
  }

  async saveUser() {
    this.setState({ isLoading: true });
    const { user } = this.state;
    await updateUser(user);
    this.setState({
      isLoading: false,
      updated: true,
    });
  }

  render() {
    const { isLoading, updated, user } = this.state;
    const { name, email, image, description } = user;
    const isEnabled = name.length > 0
      && email.length > 0 && image.length > 0 && description.length > 0;
    return (
      <>
        <Header />
        { isLoading ? <Loading /> : (
          <div data-testid="page-profile-edit">
            <form>
              <label htmlFor="name">
                Nome
                <input
                  type="text"
                  data-testid="edit-input-name"
                  name="name"
                  value={ name }
                  onChange={ this.handleChange }
                  required
                />
              </label>
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  data-testid="edit-input-email"
                  name="email"
                  value={ email }
                  onChange={ this.handleChange }
                  required
                />
              </label>
              <label htmlFor="image">
                Imagem
                <input
                  type="text"
                  data-testid="edit-input-image"
                  name="image"
                  value={ image }
                  onChange={ this.handleChange }
                  required
                />
              </label>
              <label htmlFor="description">
                Descrição
                <textarea
                  data-testid="edit-input-description"
                  name="description"
                  value={ description }
                  onChange={ this.handleChange }
                  required
                />
              </label>
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ !isEnabled }
                onClick={ this.saveUser }
                name="Salvar"
              >
                Salvar
              </button>
            </form>
            { updated && <Redirect to="/profile" /> }
          </div>
        )}
      </>
    );
  }
}
// Requisito 14 feito com ajuda do link do código da aula bônus.
// https://github.com/tryber/sd-016-a-live-lectures/pull/33/files
