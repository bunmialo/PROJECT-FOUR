class GenresController < ApplicationController
  def index
    @genres = Genre.get_genres
    render json: @genres
  end

  def show
    @genres = Genre.get_genres
    @genres.first[1..-1].first.each do |genre|
      # "1..-1"" is to exclude the first element in the array, since we do not need it
      Genre.create(
        id: genre["id"],
        name: genre["name"]
      )
    end
  end
end
