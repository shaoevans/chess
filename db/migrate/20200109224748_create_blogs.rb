class CreateBlogs < ActiveRecord::Migration[5.2]
  def change
    create_table :blogs do |t|
      t.integer :author_id, null: false
      t.string :title, null: false
      t.string :description, null: false
      t.string :category, null: false
      t.text :body, null: false
      t.integer :image_id
      t.timestamps
    end
    add_index :blogs, :author_id
  end
end
