class MoviesController < ApplicationController
  def index
    @movies = Movie.get_movies
    render json: @movies
  end
end