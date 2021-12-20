import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      buttonStatus: true,
      isLoading: false,
      artistAlbum: '',
      album: [],
    };
    this.buttonInput = this.buttonInput.bind(this);
    this.buttonSearch = this.buttonSearch.bind(this);
  }

  buttonInput({ target: { value } }) {
    const two = 2;

    this.setState({
      buttonStatus: value.length < two,
      inputValue: value,
    });
  }

  async buttonSearch() {
    const { inputValue } = this.state;
    this.setState({ isLoading: true, inputValue: '' });

    const resultAPI = await searchAlbumsAPI(inputValue);
    if (resultAPI.length > 0) {
      this.setState({
        isLoading: false,
        album: resultAPI,
        artistAlbum: `Resultado de álbuns de: ${inputValue}`,
      });
    } else {
      this.setState({
        artistAlbum: 'Nenhum álbum foi encontrado',
        isLoading: false,
      });
    }
  }

  render() {
    const { buttonStatus, inputValue, isLoading, artistAlbum, album } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <label htmlFor="artist">
            <input
              type="text"
              id="artist"
              onChange={ this.buttonInput }
              data-testid="search-artist-input"
              value={ inputValue }
            />
            <button
              type="button"
              onClick={ this.buttonSearch }
              disabled={ buttonStatus }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </label>
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              <p>{ artistAlbum }</p>
              {album.map((data) => (
                <Link
                  to={ `/album/${data.collectionId}` }
                  data-testid={ `link-to-album-${data.collectionId}` }
                  key={ data.collectionId }
                >
                  <div>
                    <img
                      src={ data.artworkUrl100 }
                      alt={ data.collectionName }
                    />
                    <p>{data.collectionName}</p>
                    <p>{data.artistName}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
}
