class CreateForums < ActiveRecord::Migration[5.2]
  def change
    create_table :forums do |t|
      t.string :category, null: false
      t.timestamps
    end
  end
end
