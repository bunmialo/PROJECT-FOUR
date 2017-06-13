class Genre < ApplicationRecord
  has_and_belongs_to_many :movies

  def self.get_genres
    response = HTTParty.get('https://api.themoviedb.org/3/genre/movie/list?api_key=b252c8a5b57d94f064c7af84cd5d1bff&language=en-US')
  end
end
