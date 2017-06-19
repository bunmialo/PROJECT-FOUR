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



 renderMovies() {
    if(this.props.apiData == null) {
       <div>Loading...</div>
    } else {
      return this.props.apiData.map((movie) => {
          return (
            <div>
               <button onClick={this.addMovie} className='addMovie'>Add This Movie</button>
       
            </div>
          );
      });

    }
    
  }

  render() {
    return (
      <div className='search-list'>
        <h3>Title: {this.props.apiData.title}</h3>
        <p>Overview: {this.props.apiData.overview}</p>
        <ul className="movie_search">
          <li>Genre: {this.props.apiData.genre_id}</li>
          <li>Release date: {this.props.apiData.release_date}</li>
        </ul>
        <img className='image' src={"https://image.tmdb.org/t/p/w500" + this.props.apiData.poster_path} />
      </div>
    );
  }
}








export default SearchResult;