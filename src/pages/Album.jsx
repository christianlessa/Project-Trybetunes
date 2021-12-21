import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      name: '',
      album: '',
    };
    this.getAlbumAPI = this.getAlbumAPI.bind(this);
  }

  componentDidMount() {
    this.getAlbumAPI();
  }

  async getAlbumAPI() {
    const { match: { params: { id } } } = this.props;
    const albumAPI = await getMusics(id);
    this.setState({
      musicList: albumAPI,
      name: albumAPI[0].artistName,
      album: albumAPI[0].collectionName,
    });
  }

  render() {
    const {
      musicList,
      name,
      album,
    } = this.state;

    return (
      <>
        <Header />
        <div>
          <div data-testid="page-album">
            <h2 data-testid="artist-name">{name}</h2>
            <h3 data-testid="album-name">{album}</h3>
          </div>
          <MusicCard musicList={ musicList } />
        </div>

      </>
    );
  }
}

// propTypes feito com ajuda do link https://stackoverflow.com/questions/32325912/react-proptype-array-with-shape
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
