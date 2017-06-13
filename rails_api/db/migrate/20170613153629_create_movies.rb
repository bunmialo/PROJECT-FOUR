
class CreateBoomLists < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.text :overview
      t.integer :release_date
      t.integer :rating
      t.string :poster_path
      t.integer :genre_id

      t.timestamps
    end
  end
end
