import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {

  return (
    <div className="jumbotron">
      <h1>Infuri<b>Rating</b></h1>
      <p>Add something clever here</p>
      <Link to="about" className="btn btn-primary btn-lg">About</Link>
    </div>
  );
}

export default HomePage;