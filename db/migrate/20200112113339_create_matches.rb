class CreateMatches < ActiveRecord::Migration[5.2]
    def change
      create_table :matches do |t|
        t.integer :white_player_id, null: false
        t.integer :black_player_id, null: false
        t.text :move_string, null: false, default: ""
        t.boolean :pending, null: false, default: true
        t.string :match_type, null: false
        t.integer :winner_id
        t.integer :white_player_time
        t.integer :black_player_time
        t.timestamps
      end
      add_index :matches, :white_player_id
      add_index :matches, :black_player_id
    end
end
