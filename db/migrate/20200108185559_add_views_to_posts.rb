class AddViewsToPosts < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :views, :integer, default: 0, null: false
  end
end
