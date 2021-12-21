import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      checkBox: false,
    };

    this.saveFavorite = this.saveFavorite.bind(this);
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

  render() {
    const { music: { trackName, trackId, previewUrl } } = this.props;
    const { state: { isLoading, checkBox }, saveFavorite } = this;
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
              onChange={ saveFavorite }
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
// Requisito 7 e 8 feito com ajuda do Denilson Santuchi.
