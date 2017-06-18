import React, { Component } from 'react';
import Movie from './Movie';

class Movielist extends Component {

  renderMoviesForm() {
    return (
      <div className='movielis'>
        {this.props.movies.map((movie) => {
          if (this.props.currentlyEditing === movie.id) {
            return (
              <div className='editForm' key={movie.id}>
                <form
                onSubmit={event => this.props.editMovie(event, movie.id)}
                className='edit'
                >
                  <input 
                    type='text'
                    name='title'
                    value={this.props.titleValue}
                    onChange={this.props.handleTitleInputChange}
                  />
                  <input 
                    type='text'
                    name='overview'
                    value={this.props.overviewValue}
                    onChange={this.props.handleOverviewInputChange}
                  />
                  <input 
                    type='text'
                    name='release_date'
                    value={this.props.release_dateValue}
                    onChange={this.props.handleRelease_dateInputChange}
                  />
                  <input 
                    type='text'
                    name='poster_path'
                    value={this.props.poster_pathValue}
                    onChange={this.props.handlePoster_pathInputChange}
                  />
                  <input type='submit' value='Edit mmovie!' />
                </form>
              </div>
            );
          }
        })}

      </div>
    );
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
                <Movie 
                  key={movie.id} 
                  movie={movie} 
                  setFeature={this.props.setFeature}
                  featuredMovieId={this.props.featuredMovieId}
                  deleteMovie={this.props.deleteMovie}
                  showEditForm={this.props.showEditForm}
                />
              </ul>
            </div>
          );
      });
    }  
  }
 
render() {
  return (
    <div>
      {this.renderMovies()}
      {this.renderMoviesForm()}
    </div>
    );
  };
}


export default Movielist;