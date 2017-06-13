class CreateMoviesGenreTable < ActiveRecord::Migration[5.1]
  def change
    create_table :movies_genres do |t|
      t.references :movie
      t.references :genre
      
      t.timestamps
    end
  end
end
