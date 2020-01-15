class GameRoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_for 'game_room_channel'
  end

  def speak(data)
    match = Match.find_by(id: data["matchId"])
    old_move_string = match.move_string
    match.update(move_string: old_move_string + " " + data.move)
    if data["gameOver"]
      match.update(pending: false)
    end
    socket = { move: move }
    ChatChannel.broadcast_to('game_room_channel', socket)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
