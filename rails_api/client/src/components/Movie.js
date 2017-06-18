import React, { Component } from 'react';

class Movie extends Component {
  render() {
    return (
      <div className='movie-li'>
        <h3>Title: {this.props.movie.title}</h3>
        <p>Overview: {this.props.movie.overview}</p>
        <ul className="Movie">
          <li>Genre: {this.props.movie.genre_id}</li>
          <li>Release date: {this.props.movie.release_date}</li>
        </ul>
        <img className='image' src={"https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path} />
        <button className='edit_movie' onClick={this.props.showEditForm(this.props.movie.id)}>Edit Movie</button>
        <button className='delete_movie' onClick={this.props.deleteMovie(this.props.movie.id)}>Delete Movie</button>
      </div>
    );
  }
}

export default Movie;