import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      checkBox: false,
    };

    this.saveFavorite = this.saveFavorite.bind(this);
    this.getFavorite = this.getFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  componentDidMount() {
    this.getFavorite();
  }

  async getFavorite() {
    const { music: { trackId } } = this.props;
    const myFavorites = await getFavoriteSongs();
    myFavorites.some((song) => song.trackId === trackId
     && this.setState({ checkBox: true }));
  }

  async saveFavorite() {
    const { music: { trackId } } = this.props;
    this.setState({
      isLoading: true,
      checkBox: true,
    });
    await addSong(trackId);
    this.setState({ isLoading: false });
  }

  async removeFavorite() {
    const { music: { trackId } } = this.props;
    this.setState({
      isLoading: true,
      checkBox: false,
    });
    await removeSong(trackId);
    this.setState({ isLoading: false });
  }

  render() {
    const { music: { trackName, trackId, previewUrl } } = this.props;
    const { state: { isLoading, checkBox }, saveFavorite, removeFavorite } = this;
    return (
      <div>
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        { isLoading ? <Loading /> : (
          <label htmlFor="favorite">
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              id="favorite"
              checked={ checkBox }
              onChange={ checkBox ? removeFavorite : saveFavorite }
            />
          </label>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
};
// Requisito 7, 8 e 9 feito com ajuda do Denilson Santuchi.
