class GameRoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_for 'game_room_channel'
  end

  def speak(data)
    match = Match.find_by(id: data["matchId"])
    old_move_string = match.move_string
    if old_move_string == ""
      new_move_string = data['move']
    else
      new_move_string = old_move_string + " " + data['move']
    end
    match.update(move_string: new_move_string)
    socket = { move: data['move'], matchId: match.id }
 
    GameRoomChannel.broadcast_to('game_room_channel', socket)
  end

  def over(data) 
    match = Match.find_by(id: data["matchId"])
    match.update(pending: false)
    socket = { matchId: match.id, gameOver: true}
    GameRoomChannel.broadcast_to('game_room_channel', socket)
  end


  def undo(data)
    match = Match.find_by(id: data["matchId"])
    old_move_string = match.move_string
    new_move_string = old_move_string[0..-7]
    match.update(move_string: new_move_string)
    socket = { refresh: new_move_string, matchId: match.id }
    GameRoomChannel.broadcast_to('game_room_channel', socket)
  end


  # def queue(data)
  #   if $redis.get("a") != nil
  #     black_player_id = $redis.get("a").to_i
  #     user = User.find_by(username: data['playerUsername'])
  #     white_player_id = user.id
  #     # if black_player_id != white_player_id 
  #     $redis.del("a")
  #     match = Match.create(match_type: "classical", black_player_id: black_player_id, white_player_id: white_player_id)
  #     socket = { matchId: match.id }
  #     GameRoomChannel.broadcast_to('game_room_channel', socket)
  #     # else
  #       # $redis.del("a")
  #     # end

  #   else  
  #     user = User.find_by(username: data['playerUsername'])
  #     $redis.set("a", user.id)
  #   end
  # end

  # def dequeue(data)
  #   $redis.del("a")
  # end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
