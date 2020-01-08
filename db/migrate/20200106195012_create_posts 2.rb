class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.integer :author_id, null: false
      t.integer :forum_id, null: false
      t.string :title, null: false
      t.timestamps
    end
    add_index :posts, :author_id
    add_index :posts, :forum_id
  end
end
