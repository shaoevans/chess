json.array! @users do |user|
    json.extract! user, :id, :username, :bullet_elo, :blitz_elo, :classical_elo, :rapid_elo
end