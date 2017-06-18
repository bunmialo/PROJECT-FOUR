import React, { Component } from 'react';
import Movielist from './components/Movielist';
import SearchResult from './components/SearchResult';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
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
    this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
    this.handleOverviewInputChange = this.handleOverviewInputChange.bind(this);
    this.handleRelease_dateInputChange = this.handleRelease_dateInputChange.bind(this);
    this.handlePoster_pathInputChange = this.handlePoster_pathInputChange.bind(this);
    this.handleViewClick = this.handleViewClick.bind(this);
  }

  componentDidMount() {
    
  }

  /* features movie */
  setFeature(id) {
    this.setState({
      featuredMovieId: id,
    });
  }

  /* shows/hides edit form for individual movie */
  showEditForm(id) {
    fetch(`/movies/${id}`).then(res => res.json()).then((jsonRes) => {
      this.setState({
        currentlyEditing: id,
        titleValue: jsonRes.results.title,
        overviewValue: jsonRes.results.overview,
        release_dateValue: jsonRes.results.release_date,
        poster_pathValue: jsonRes.results.poster_path,
        currentlyAdding: false,
      });
    }).catch(err => console.log(err));
  }

  // handleSearchClick () {
  //   console.log('apiData');
  // }

  
  handleViewClick() {
    fetch('/movies').then(res => res.json()).then((jsonRes) => {
      console.log(jsonRes)
      this.setState({
        apiData: jsonRes.results,
        apiDataLoaded: true,
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
          title: this.state.titleValue,
          overview: this.state.overviewValue,
          release_date: this.state.release_dateValue,
          poster_path: this.state.poster_pathValue,
        },
      }),
    }).then(res => res.json()).then((jsonRes) => {
      this.setState({
        apiData: jsonRes.results,
        currentlyEditing: null,
        titleValue: '',
        overviewValue: '',
        release_dateValue: '',
        poster_pathValue: '',
      });
    }).catch(err => console.log(err));
  }

  deleteMovie(id) {
    fetch(`/movies/${id}`, {
      method: 'DELETE',
  }).then(res => res.json()).then((jsonRes) => {
    this.setState({
      apiData: jsonRes.results,
      });
    }).catch(err => console.log(err));
  }

  /* Form controls */
  handleTitleInputChange(event) {
    this.setState({ titleValue: event.target.value });
  }

  handleOverviewInputChange(event) {
    this.setState({ overviewValue: event.target.value });
  }

  handleRelease_dateInputChange(event) {
    this.setState({ release_dateValue: event.target.value });
  }

  handlePoster_pathInputChange(event) {
    this.setState({ poster_pathValue: event.target.value });
  }

  renderMovieList() {
  if (this.state.apiDataLoaded) {
    return (
      <Movielist

        movies={this.state.apiData} 
        addMovie={this.addMovie} 
        imageSrc={this.state.poster_path}

        apiData={this.state.apiData}
        setFeature={this.setFeature}
        featuredMovieId={this.state.featuredMovieId}
        deleteMovie={this.deleteMovie}
        currentlyEditing={this.state.currentlyEditing}
        showEditForm={this.showEditForm}
        editMovie={this.editMovie}
        handleTitleInputChange={this.handleTitleInputChange}
        handleOverviewInputChange={this.handleOverviewInputChange}
        handleRelease_dateInputChange={this.handleRelease_dateInputChange}
        handlePoster_pathInputChange={this.handlePoster_pathInputChange}
        titleValue={this.state.titleValue}
        overviewValue={this.state.overviewValue}
        release_dateValue={this.state.release_dateValue}
        poster_pathValue={this.state.poster_pathValue}
        />
    );
  }
  return <p>Loading</p>;
}

  render() {
    return (
      <div className="App">
        <h1>Welcome to bOOmList!</h1>
        <h2>Your one-stop app for popular movies</h2>
        <div className='buttons'>
          <button className='view' onClick={this.handleViewClick}>
            View bOOmList
          </button>
           <button className='search' onClick={this.handleSearchClick}>
            Search
          </button>
        </div>
      {/* {(this.state.apiDataLoaded) ? <Movielist 
        movies={this.state.apiData} 
        addMovie={this.addMovie} 
        imageSrc={this.state.poster_path} /> : ""} */}
      {this.renderMovieList()}
      </div>

    );
  }
}

export default App;
