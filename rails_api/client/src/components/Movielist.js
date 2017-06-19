import React, { Component } from 'react';
import Movie from './Movie';

class Movielist extends Component {

  renderMovies() {
    return (
      <div className='movielis'>
        {this.props.movies.map((movie) => {
            return ( 
              <Movie 
                  key={movie.id} 
                  movie={movie}
                  renderState={this.props.renderState}
                  addMovie={this.props.addMovie}
                  deleteMovie={this.props.deleteMovie}
                  showEditForm={this.props.showEditForm}
                  editMovie={this.props.editMovie}
                />
            )
          })
        }
      </div>
    );
  }
 
render() {
  return (
    <div>
      {this.renderMovies()}
    </div>
    );
  };
}


export default Movielist;