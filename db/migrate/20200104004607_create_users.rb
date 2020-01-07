class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :session_token, null: false
      t.string :password_digest, null: false
      t.string :email, null: false
      t.integer :bullet_elo, null: false, default: 1000
      t.integer :blitz_elo, null: false, default: 1000
      t.integer :classical_elo, null: false, default: 1000
      t.integer :rapid_elo, null: false, default: 1000
      t.timestamps
    end
    add_index :users, :username, unique: true
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
