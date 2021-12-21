import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { musicList } = this.props;
    console.log(musicList);
    return (
      <div>
        {musicList.slice([1]).map(({ trackName, artistId, previewUrl }) => (
          <>
            <h3 key={ artistId }>{trackName}</h3>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio>
          </>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicList: PropTypes.string.isRequired,
};
// Requisito 7 feito com ajuda do Denilson Santuchi.
