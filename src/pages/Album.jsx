import React, { Component } from 'react';
import Header from './Header';

export default class Album extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h1>Album:</h1>
        </div>
      </>
    );
  }
}
