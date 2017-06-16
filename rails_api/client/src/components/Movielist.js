import React, { Component } from 'react';
import Movie from './Movie';

class Movielist extends Component {

  renderMovies() {
    // movies happens to be null?? why
    if(this.props.movies == null) {
       <div>Loading...</div>
    } else {
      return this.props.movies.map((movie) => {
          return (
            <ul>
              <Movie key={movie.id} movie={movie} />
            </ul>
          );
      });

    }
    
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