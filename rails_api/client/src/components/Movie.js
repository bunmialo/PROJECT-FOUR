import React, { Component } from 'react';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state ={
      currentlyEditing: false,
      titleValue: '',
      overviewValue: '',
      release_dateValue: '',
      poster_pathValue: '',
    }
    this.handleEditMode = this.handleEditMode.bind(this);
    this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
    this.handleOverviewInputChange = this.handleOverviewInputChange.bind(this);
    this.handleRelease_dateInputChange = this.handleRelease_dateInputChange.bind(this);
    this. handlePoster_pathInputChange = this. handlePoster_pathInputChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      titleValue: this.props.movie.title,
      overviewValue: this.props.movie.overview,
      release_dateValue: this.props.movie.release_date,
      poster_pathValue: this.props.movie.poster_path,
    })
  }

  handleEditMode() {
    this.setState({
      currentlyEditing: true,
    })
  }

  /* Form controls */
  handleTitleInputChange(event) {
    console.log(event.target.value)
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


  render() {
    if (this.props.renderState === 'db') {
      if (!this.state.currentlyEditing) {
        return (
          <li className='movie-li'>
            <h3>Title: {this.props.movie.title}</h3>
            <p>Overview: {this.props.movie.overview}</p>
            <p>Release date: {this.props.movie.release_date}</p>
            <img className='image' src={"https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path} />
            <div className='e_d_buttons'>
              <button className='delete_movie' onClick={() => {this.props.deleteMovie(this.props.movie.id)}}>Delete Movie</button>
              <button className='edit_movie' onClick={this.handleEditMode}>Edit Movie</button>
            </div>
          </li>
        )
      } else {
        console.log('currently editing')
        return  (
          <li>
            <form
            onSubmit={event => this.props.editMovie(event, this.props.movie.id)}
            className='edit'
            >
              <input 
                type='text'
                name='title'
                value={this.state.titleValue}
                onChange={(e) => {this.handleTitleInputChange(e)}}
              /><br/>
              <input 
                type='text'
                name='overview'
                value={this.state.overviewValue}
                onChange={(e) => {this.handleOverviewInputChange(e)}}
              /><br/>
              <input 
                type='text'
                name='release_date'
                value={this.state.release_dateValue}
                onChange={(e) => {this.handleRelease_dateInputChange(e)}}
              /><br/>
              <input 
                type='text'
                name='poster_path'
                value={this.state.poster_pathValue}
                onChange={(e) => {this.handlePoster_pathInputChange(e)}}
              /><br/>
              <input type='submit' value='Edit movie!' />
            </form>
          </li>
        )
      }
    } else if (this.props.renderState === 'api') {
        return (
          <li className='movie-li'>
            <h3>Title: {this.props.movie.title}</h3>
            <p>Overview: {this.props.movie.overview}</p>
            <p>Release date: {this.props.movie.release_date}</p>
            <img className='image' src={"https://image.tmdb.org/t/p/w500" + this.props.movie.poster_path} />
            <div className='e_d_buttons'>
              <button className='add_movie' onClick={(e) => {this.props.addMovie(e, this.props.movie)}}>Add Movie</button>
            </div>
          </li>
        )

    }
  }
}

export default Movie;