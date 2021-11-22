import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      buttonStatus: true,
      isLoading: false,
      isLoaded: false,
    };
    this.inputValue = this.inputValue.bind(this);
    this.buttonDisable = this.buttonDisable.bind(this);
    this.saveName = this.saveName.bind(this);
  }

  inputValue(event) {
    this.setState({ name: event.target.value },
      () => this.setState({ buttonStatus: this.buttonDisable() }));
  }

  buttonDisable() {
    const three = 3;
    const { name } = this.state;
    if (name.length >= three) return false;
    return true;
  }

  async saveName() {
    this.setState({ isLoading: true });
    const { name } = this.state;

    await createUser({ name });
    this.setState({ isLoaded: true });
  }

  render() {
    const { buttonStatus, isLoading, isLoaded } = this.state;
    if (isLoaded) return <Redirect to="/search" />;

    return (
      isLoading ? <Loading /> : (
        <form>
          <div data-testid="page-login">
            <h1>Login:</h1>
            <label htmlFor="name">
              <p>Name:</p>
              <input
                type="text"
                onChange={ this.inputValue }
                name="name"
                data-testid="login-name-input"
              />
              <button
                onClick={ this.saveName }
                disabled={ buttonStatus }
                type="button"
                data-testid="login-submit-button"
              >
                Entrar
              </button>
            </label>
          </div>
        </form>
      )
    );
  }
}
