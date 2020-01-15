class Match < ApplicationRecord
    validates :black_player_id, :white_player_id, :pending, presence: true
    validates :match_type, inclusion: ["bullet", "blitz", "rapid", "classical"]

    belongs_to :black_player,
        primary_key: :id,
        foreign_key: :black_player_id,
        class_name: :User

    belongs_to :white_player,
        primary_key: :id,
        foreign_key: :white_player_id,
        class_name: :User
        
end
