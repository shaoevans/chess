json.array! @matches do |match|
    json.extract! match, :id, :match_type, :move_string
    json.black_player_name match.black_player.username
    json.white_player_name match.white_player.username
end