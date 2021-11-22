import React, { Component } from 'react';
import Header from './Header';

export default class ProfileEdit extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          <h1>Profile Edit</h1>
        </div>
      </>
    );
  }
}
