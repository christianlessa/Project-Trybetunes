import React, { Component } from 'react';
import Header from './Header';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      buttonStatus: true,

    };
    this.inputValue = this.inputValue.bind(this);
  }

  inputValue({ target: { value } }) {
    const two = 2;

    this.setState({
      buttonStatus: value.length < two,
    });
  }

  render() {
    const { buttonStatus } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search" />
        <label htmlFor="artist">
          <input
            type="text"
            id="artist"
            onChange={ this.inputValue }
            data-testid="search-artist-input"
          />
          <button
            type="button"
            disabled={ buttonStatus }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </label>
      </>
    );
  }
}
