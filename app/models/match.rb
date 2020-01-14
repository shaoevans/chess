class Match < ApplicationRecord
    validates :black_player_id, :white_player_id, :move_string, :status, presence: true
    validates :move_string, inclusion: ["PENDING", "COMPLETED"]

    
end
