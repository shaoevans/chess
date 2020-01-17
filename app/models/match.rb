class Match < ApplicationRecord
    validates :black_player_id, :white_player_id, presence: true
    validates :match_type, inclusion: {in: ["bullet", "blitz", "rapid", "classical"]}
    validates :pending, inclusion: {in: [true, false]}

    belongs_to :black_player,
        primary_key: :id,
        foreign_key: :black_player_id,
        class_name: :User

    belongs_to :white_player,
        primary_key: :id,
        foreign_key: :white_player_id,
        class_name: :User
        
end
