import React, { Component } from 'react';
import Movielist from './components/Movielist';
import SearchResult from './components/SearchResult';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dbLoaded: false,
      dbData: null,
      renderState: '',



      apiData: null,
      apiDataLoaded: false,
      currentlyAdding: false,
      addMovie: '',

      /* inputs */
      movies: [],
      titleValue: '',
      overviewValue: '',
      release_dateValue: '',
      poster_pathValue: '',
    };
    this.editMovie = this.editMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    // this.addMovie = this.addMovie.bind(this);
  }

  componentDidMount() {
    
  }

  handleSearchClick(event) {
    this.setState({renderState: 'api'});
    console.log('in handle search');
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=b252c8a5b57d94f064c7af84cd5d1bff&language=en-US&page=1')
    .then((res) => {
      // console.log(res);
      return res.json()
    })
    .then((jsonRes) => {
      console.log('before set state', jsonRes.results);
      this.setState({
        apiData: jsonRes.results,
        apiDataLoaded: true,
      },
      //  () => {console.log('after set state: ', this.state.apiData)}   <---- callback to run ONLY AFTER state is set
       );
    });
  }

  handleViewClick() {
    this.setState({renderState: 'db'})
    fetch('/movies').then(res => res.json()).then((jsonRes) => {
      console.log(jsonRes);
      this.setState({
        dbData: jsonRes,
        dbLoaded: true,
      });
    });
  }

  addMovie(event, movie) {
    event.preventDefault();
    console.log(movie)
  fetch('/movies', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      movies: {
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        rating: 1,
        poster_path: movie.poster_path,
        genre_id: 1,
      }
    }),
  })
  .then((res) => {
    return res.json();
  })
  .then((resJson) => {
    console.log(resJson);
    // this.setState({
    //   id: resJson.results[0].id
    // })
  })
}

  editMovie(event, id) {
    event.preventDefault();
    fetch(`/movies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movies: {
          title: event.target.title.value,
          overview: event.target.overview.value,
          release_date: event.target.release_date.value,
          rating: 1,
          poster_path: event.target.poster_path.value,
          genre_id: 1,
        },
      }),
    }).then(res => res.json()).then((jsonRes) => {
      console.log(jsonRes);
      // this.setState({
      //   apiData: jsonRes.results,
      //   currentlyEditing: null,
      //   titleValue: '',
      //   overviewValue: '',
      //   release_dateValue: '',
      //   poster_pathValue: '',
      // });
    }).catch(err => console.log(err));
  }

  deleteMovie(id) {
    console.log('delete', id);
    fetch(`/movies/${id}`, {
      method: 'DELETE',
  }).then((res) => {
    console.log(res)
    res.json()
  }).then((jsonRes) => {
    console.log(jsonRes)
    // this.setState({
    //   apiData: jsonRes.results,
    //   });
    }).catch(err => console.log(err));
  }

  renderMovieList() {
  if (this.state.renderState === 'db') {
    if (this.state.dbLoaded) {
      return (
        <Movielist
          renderState={this.state.renderState}
          movies={this.state.dbData} 
          // addMovie={this.addMovie} 
          // apiData={this.state.apiData}
          deleteMovie={this.deleteMovie}
          showEditForm={this.showEditForm}
          editMovie={this.editMovie}
          />
      );
    } else {
      return (
        <p>Loading</p>
      )
    }
  } else if (this.state.renderState === 'api') {
    if (this.state.apiDataLoaded) {
     return (
        <Movielist
          renderState={this.state.renderState}
          movies={this.state.apiData} 
          addMovie={this.addMovie} 
          deleteMovie={this.deleteMovie}
          />
      ); 
    } else {
      return (
        <p>Loading</p>
      )    
    }
  } else {
    return (
      <p>click a button!</p>
    )
  }
}

  render() {
    return (
      <div className="App">
        <h1>Welcome to bOOmList!</h1>
        <h2>Your one-stop app for popular movies!!</h2>
        <div className='buttons'>
          <button className='view' onClick={this.handleViewClick}>View bOOmList</button>
          <button className='search' onClick={this.handleSearchClick}>Search</button>
        </div>
      {this.renderMovieList()}
       {/* <SearchResult /> */}
      </div>
    );
  }
}

export default App;
