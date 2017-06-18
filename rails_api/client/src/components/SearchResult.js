import React, { Component } from 'react';
import Movie from './Movie';

class SearchResult extends Component {
  constructor(props) {
  super(props);
  this.state = {
      apiData: null,
      title: null,
      overview: null,
      release_date: null,
      poster_path: null,
      genre_id: null,
      apiDataLoaded: false,
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.addMovie = this.addMovie.bind(this);
  }

  handleSearch(event) {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=b252c8a5b57d94f064c7af84cd5d1bff&language=en-US&page=1')
    .then((res) => {
      console.log(res);
      return res.json()
    })
    .then((jsonRes) => {
      // console.log(jsonRes)
      this.setState((prevState) => {
        return {
        apiData: jsonRes.results,
        apiDataLoaded: true,
        }
      });
    });
  }

  addMovie(event) {
    event.preventDefault();
  // console.log(this.state.id)
  fetch('https://api.themoviedb.org/3/movie/popular?api_key=b252c8a5b57d94f064c7af84cd5d1bff&language=en-US&page=1', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      title: event.target.title.value,
      overview: event.target.overview.value,
      release_date: event.target.release_date.value,
      poster_path: event.target.poster_path.value
    }),
  })
  .then((res) => {
    return res.json();
  })
  .then((resJson) => {
    this.setState({
      id: resJson.results[0].id
    })
  })
}

 renderMovies() {
    // movies happens to be null?? why
    if(this.props.movies == null) {
       <div>Loading...</div>
    } else {
      return this.props.movies.map((movie) => {
          return (
            <div>
              <ul>
                <Movie key={movie.id} movie={movie} />
              </ul>
              <button onClick={this.props.addMovie} className='addMovie'>Add This Movie</button>
            </div>
          );
      });

    }
    
  }

  render() {
    return (
      <div className='search-list'>
        <h3>Title: {this.props.movie.title}</h3>
        <p>Overview: {this.props.movie.overview}</p>
        <ul className="Movie">
          <li>Genre: {this.props.movie.genre_id}</li>
          <li>Release date: {this.props.movie.release_date}</li>
        </ul>
        <img className='image' src={"https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path} />
      </div>
    );
  }
}








export default SearchResult;