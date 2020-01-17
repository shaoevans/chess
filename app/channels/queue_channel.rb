
class QueueChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_for 'queue_channel'
  end

  def queue(data)
    if $redis.get("a") != nil
      black_player_id = $redis.get("a").to_i
      user = User.find_by(username: data['playerUsername'])
      white_player_id = user.id
      $redis.del("a")
      if black_player_id != white_player_id 
        match = Match.create(match_type: "classical", black_player_id: black_player_id, white_player_id: white_player_id)
        socket = { matchId: match.id }
        QueueChannel.broadcast_to('queue_channel', socket)
      # else
        # $redis.del("a")
      end

    else  
      user = User.find_by(username: data['playerUsername'])
      $redis.set("a", user.id)
    end
  end

  def dequeue(data)
    $redis.del("a")
  end

  def unsubscribed

    # Any cleanup needed when channel is unsubscribed
  end

end
