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



      apiData: null,
      title: null,
      overview: null,
      release_date: null,
      poster_path: null,
      genre_id: null,
      apiDataLoaded: false,
      currentlyEditing: null,
      currentlyAdding: false,
      addMovie: '',

      /* inputs */
      movies: [],
      titleValue: '',
      overviewValue: '',
      release_dateValue: '',
      poster_pathValue: '',
    };
    this.setFeature = this.setFeature.bind(this);
    this.showEditForm = this.showEditForm.bind(this); 
    this.editMovie = this.editMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    // this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
    // this.handleOverviewInputChange = this.handleOverviewInputChange.bind(this);
    // this.handleRelease_dateInputChange = this.handleRelease_dateInputChange.bind(this);
    // this.handlePoster_pathInputChange = this.handlePoster_pathInputChange.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);

    this.handleSearchClick = this.handleSearchClick.bind(this);
    // this.addMovie = this.addMovie.bind(this);
  }

  componentDidMount() {
    
  }

  handleSearchClick(event) {
    console.log('in handle search');
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=b252c8a5b57d94f064c7af84cd5d1bff&language=en-US&page=1')
    .then((res) => {
      // console.log(res);
      return res.json()
    })
    .then((jsonRes) => {
      console.log(jsonRes.results);
      this.setState({
        apiData: jsonRes.results,
        apiDataLoaded: true,
      });
    });
  }



  /* features movie */
  setFeature(id) {
    // this.setState({
    //   featuredMovieId: id,
    // });
  }

  /* shows/hides edit form for individual movie */
  showEditForm(id) {
    console.log('edit', id)
    fetch(`/movies/${id}`).then(res => res.json()).then((jsonRes) => {
      this.setState({
        currentlyEditing: id,
        titleValue: jsonRes.title,
        overviewValue: jsonRes.overview,
        release_dateValue: jsonRes.release_date,
        poster_pathValue: jsonRes.poster_path,
        currentlyAdding: false,
      });
    }).catch(err => console.log(err));
  }

  handleViewClick() {
    fetch('/movies').then(res => res.json()).then((jsonRes) => {
      console.log(jsonRes);
      this.setState({
        dbData: jsonRes,
        dbLoaded: true,
      });
    });
  }

  editMovie(event, id) {
    event.preventDefault();
    fetch(`/movies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        movie: {
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
  if (this.state.dbLoaded) {
    return (
      <Movielist

        movies={this.state.dbData} 
        // addMovie={this.addMovie} 
        // imageSrc={this.state.poster_path}

        // apiData={this.state.apiData}
        // setFeature={this.setFeature}
        // featuredMovieId={this.state.featuredMovieId}
        deleteMovie={this.deleteMovie}
        // currentlyEditing={this.state.currentlyEditing}
        showEditForm={this.showEditForm}
        editMovie={this.editMovie}
        // handleTitleInputChange={this.handleTitleInputChange}
        // handleOverviewInputChange={this.handleOverviewInputChange}
        // handleRelease_dateInputChange={this.handleRelease_dateInputChange}
        // handlePoster_pathInputChange={this.handlePoster_pathInputChange}
        // titleValue={this.state.titleValue}
        // overviewValue={this.state.overviewValue}
        // release_dateValue={this.state.release_dateValue}
        // poster_pathValue={this.state.poster_pathValue}
        />
    );
  } else {
    return (
      <p>Loading</p>
    )
  }

  // return <p>Loading</p>;
}

  render() {
    return (
      <div className="App">
        <h1>Welcome to bOOmList!</h1>
        <h2>Your one-stop app for popular movies</h2>
        <div className='buttons'>
          <button className='view' onClick={this.handleViewClick}>View bOOmList</button>
          <button className='search' onClick={this.handleSearchClick}>Search</button>
        </div>
      {/* {(this.state.apiDataLoaded) ? <Movielist 
        movies={this.state.apiData} 
        addMovie={this.addMovie} 
        imageSrc={this.state.poster_path} /> : ""} */}
      {this.renderMovieList()}
       {/* <SearchResult /> */}
      </div>
    );
  }
}

export default App;
