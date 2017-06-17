import React, { Component } from 'react';
import Movielist from './components/Movielist';
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
      addMovieValue: '',
    }
    this.handleViewClick = this.handleViewClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  componentDidMount() {
    
  }


  handleViewClick() {
    console.log('apiData');
  }

  handleSearchClick () {
    fetch('/movies').then(res => res.json()).then((jsonRes) => {
      console.log(jsonRes)
      this.setState({
        apiData: jsonRes.results,
        apiDataLoaded: true,
      });
    });
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
        
      {(this.state.apiDataLoaded) ? <Movielist movies={this.state.apiData} imageSrc={this.state.poster_path} /> : ""}
      </div>
    );
  }
}

export default App;
