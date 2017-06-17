class MoviesController < ApplicationController
  
  def index
    @movies = Movie.get_movies
    render json: @movies
  end

  def show
    begin
      @movie = Movie.find(params[:id])
      render json: @movie
    rescue ActiveRecord:: RecordNotFound
      render json: { message: "no movie in bOOmList matches that ID" }, status: 404
    rescue Exception
      render json: { message: "bro, there was some error" }, status: 500
    end
  end

  def create
    begin
      @movie = Movie.new(movie_params)
      @movie.save
      @all_movies = Movie.order(:id)
      render json: @all_movies
    rescue Exception
      render json: { message: "bro, there was some error" }, status: 500
    end
  end

  def update
    begin
      @movie = Movie.find(params[:id])
      @movie.update(movie_params)
      @all_movies = Movie.order(:id)
      render json: @all_movies
    rescue Exception
      render json: { message: "bro, there was an error" }
    end
  end

  def destroy
    begin
      @movies = Movie.find(params[:id])
      @movies.destroy
      @all_movies = Movie.order(:id)
      render json: @all_movies
    rescue ActiveRecord::RecordNotFound
      render json: { message: "no movie in bOOmList matches that ID" }
    rescue Exception
      render json: { message: "bro, there was an error" }
    end
  end

private
  def movies_params
    params.require(:movies).permit(:title, :overview, :poster_path, :release_date)
  end

end
  #snippet for brevity