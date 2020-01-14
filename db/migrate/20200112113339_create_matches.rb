class CreateMatches < ActiveRecord::Migration[5.2]
    def change
      create_table :matches do |t|
        t.integer :white_player_id, null: false
        t.integer :black_player_id, null: false
        t.text :move_string, null: false, default: ""
        t.string :status, null: false, default: "PENDING"
        t.timestamps
      end
      add_index :matches, :white_player_id
      add_index :matches, :black_player_id
    end
end
