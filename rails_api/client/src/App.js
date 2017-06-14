import React, { Component } from 'react';
import './App.css';

class App extends Component {
constructor() {
  super();
  this.state = {
    apiData: null,
    title: null,
    overview: null,
    release_date: null,
    poster_path: null,
    genre_id: null,
    apiDataLoaded: false,
  };
}

componentDidMount() {
  fetch('/movies').then(res => res.json()).then((jsonRes) => {
    this.setState({
      apiData: jsonRes.movies_data,
      title: jsonRes.results[0].title,
      overview: jsonRes.overview,
      release_date: jsonRes.release_date,
      poster_path: jsonRes.results[0].poster_path,
      genre_id: jsonRes.results[0].genre_ids,
      apiDataLoaded: true,
    });
  });
}

showMovies() {
  return this.state.apiData.map((movie) => {
    return (
      <div className='movie' key={movie.title}>
        <p>{movie.overview}</p>
        <span className='release_date'>{movie.release_date}</span>
        <span className='poster_path'>{movie.poster_path}</span>
        <span className='genre_ids'>{movie.genre_ids}</span>
      </div>
    );
  })
}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to BoomList: The official movie watchlist app of the NBA</h2>
        </div>
      </div>
    );
  }
}

export default App;
