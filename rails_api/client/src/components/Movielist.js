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
    <div>
      {this.renderMovies()}
    </div>
    );
  };
}


export default Movielist;