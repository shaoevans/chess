class AddDescriptionToForum < ActiveRecord::Migration[5.2]
  def change
    add_column :forums, :description, :string, null: false
  end

end
