# README

It is a single-page web-app, using Ruby on Rails and React.js

The inspiration for this project came from Lichess.org, the free Correspondence Chess site. The original idea was to copy and implement all lichess features, and then later add a checkers playing option to the website.

![Evanschess Overview Demo](demos/evanschess.gif)

## Current Functionality Highlights

* Hand-rolled User Authentication using BCrypt
* Single Page Application, using React
* The illusion and convenience of multiple pages using React-Router
* Asynchronous HTTP requests using jQuery's Ajax
* Users can challenge other Users or the Computer
* The chess match board is rotated depending on which side if you are white or black
* Hard AI uses a tree of all possible game outcomes to play a flawless game
* Leave current game at anytime and come back later to replay the game; every submitted move is saved to the db
* Users can undo previously made moves
* Spectators can currently only visit the game by its link, but once there they can spectate the game live and will not be able to interact with the board in any way to affect the match
* Users can open any previous game, to view the ending state of the game, and will eventually be able to scroll over the board see the game progression
* Users can post on the forums to discuss their thoughts or review their chess games, will be eventually able to directly post   a chess game to the forum
* A queuing system using redis so that users can look for games against each other
* The ability to directly challenge other users to games by using the "challenge a friend" form
* Users can edit only their posts if they wish to
* Users can read blog posts on the website via the the all index or by year and fetch more using infinite scrolling
* Users can search for other users in the nav search bar, which will bring the user to a profile page
* Users can search the forums for forum posts that have an author, title, or comment which contains that keyword
* Posts, comments, and blogs are all paginated so that the user is not overwhelmed with data

## Implementing Chess Game Logic in the Backend

### Saving and updating board state

To have the functionality of lichess, users would have to be able to leave and come back to their chess games at any point and continue the game at where it was. To do this, I save all the moves made by the players in the backend as a string in a column called :move_string. When players load into the match page, an ajax request is made to the backend, the match is brought into the redux state with its :move_string, and updated to the state via a method called setupBoard in my backend chess board constructor, which involved a lot of string conversion to index locations.

`
```
class Board {
    constructor(moveString) {
        this.whitePieces = [];
        this.blackPieces = [];
        this.whiteLostPieces = [];
        this.blackLostPieces = [];
        this.selectPieceToPlace = this.selectPieceToPlace.bind(this);
        this.grid = [];
        this.turn = ["black", "white"]
        this.createBoard();
        if (moveString) {
            this.setupBoard(moveString)
        }
    }
    
   setupBoard(moveString) {
        if (moveString === "") {
            return;
        }
        const moveArr = moveString.split(" ");
        moveArr.forEach(move => {
            const movesArr = this.moveStringToMovePos(move)
            this.movePiece(movesArr[0], movesArr[1]);
            this.turn.push(this.turn.shift());
        })
    }

    moveStringToMovePos(move) {
        if (move === "") {
            return [];
        }
        const moveHalves = move.split("-");
        const firstMoveString = moveHalves[0];
        const firstMoveX = this.convertLettersToNumbers()[firstMoveString[0]];
        const firstMoveY = parseInt(firstMoveString[1]) - 1
        const secondMoveString = moveHalves[1];
        const secondMoveX = this.convertLettersToNumbers()[secondMoveString[0]];
        const secondMoveY = parseInt(secondMoveString[1]) - 1
        return [[firstMoveY, firstMoveX], [secondMoveY, secondMoveX]];
    }
```
`

Considering that one color always starts the game in chess, the board will always be updated to the same state and the same turn that it previously was at. 

### Check and Checkmate

The core functionality of the website is to be able to play chess. To start, I wrote a chess backend
The trickier features to implement were check, checkmate, and castling. To solve check, I put into consideration that eventually I would be using a polytreenode to come up with moves for my AI, and would need a faster way of seeing if the king was in checkmate than by iterating over every single piece and seeing if they had any valid moves that included the king of the opposite color's locations. To solve this, I added two solutions: 

* To check for check, instead of iterating over the pieces of the opposite color and seeing if their pieces valid moves included the current king's position, I instead changed it so that the king would would look at every vector possible, grab the last tile in that vector (vectors only stop growing when they hit a piece or if they hit the edge of the board) and seeing if that tile contained a piece of the opposite color capable of producing such a vector:

`
```
const horiz1 = this.growUnblockedMovesInDir(-1, 0);
const horiz2 = this.growUnblockedMovesInDir(0, -1);
const horiz3 = this.growUnblockedMovesInDir(0, 1);
const horiz4 = this.growUnblockedMovesInDir(1, 0);
const horizontals = [
    horiz1[horiz1.length-1],
    horiz2[horiz2.length-1],
    horiz3[horiz3.length-1],
    horiz4[horiz4.length-1]
]
for (let i = 0; i < horizontals.length; i++) {
    if (horizontals[i]) {
        const checkPiece = this.board.getPiece(horizontals[i])
        if ((checkPiece instanceof Queen || checkPiece instanceof Rook) && checkPiece.color === this.otherColor()) {
            return true;
        }
    }
```
`


* I was originally thinking that checkmate, which does involve iterating over every piece of my color and seeing if their are any valid moves from any piece, would be a rare condition to check for only if the king was already in check. However, I realized that I had to check this every turn to see if the game was over. I was only able to mitigate this by adding a whitePieces and blackPieces array which stores all black and white pieces, and update whenever a piece is removed from the game. This would allow checking for checkmate faster by reducing the amount of pieces that would need to be checked from a total of 64 to a maximum of 16.

`
```
isCheckMate(color) {
        const pieces = this.getPieces(color);
        let checkMate = true;
        for (let i = 0; i < pieces.length; i++) {

            if (pieces[i].validMoves().length) {
                checkMate = false;
                break;
            }
        }
        return checkMate;
}
```
`
### Live Chess and Spectating

![Chess Gameplay Demo](demos/chess-ai.gif)

I used action cable provided to implement that feeling of live chess moves updating, which allowed for both spectating and playing the game live. To do this, the front end chess board logic goes as follows:

1. When a user selects a piece, if a piece is not already "selected" AND that piece belongs to him, then this piece is now "selected" and an board tiles will be updated to display that pieces valid moves
2. If a user then clicks on a tile that is not a valid move, that piece will get "unselected" and await the user to click on a piece again
3. If the user clicks on a tile that is a valid move, this will trigger a request to the backend rails channel that will process this move 

`
```
selectPiece(pos) {
        return (e) => {
            let validMoves;
            let piece = this.state.board.getPiece(pos);
            let moveString = this.state.moveString;
            if (!this.state.pieceSelected && (piece.color === this.state.board.turn[0]) && (this.convertTurnToPlayer() === this.props.currentUser.username)) {
                validMoves = piece.validMoves();
            } else {
                if (isMoveInValidMoves(this.state.validMoves, pos)) {
                    const move1 = this.state.pieceSelected.position;
                    const move2 = pos;
                    App.cable.subscriptions.subscriptions[0].speak({ matchId: this.props.chessMatch.id, move: this.moveToString(move1, move2) })
                }
                piece = null;
                validMoves = [];
            }
            this.setState({
                pieceSelected: piece,
                validMoves: validMoves, 
                moveString: moveString, 
            });
        }
    }

```
`

4. The backend rails channel receives the move, updates the previous move string, and then broadcasts only the move back:

`
```
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
```
`

5. The move hits the frontend again, and is processed, which then moves the pieces on the board

`
```
received: data => {

    if (data.matchId !== this.props.chessMatch.id) {
        return;
    }

    if (data.gameOver) {
        this.setState({pending: false});
    } else if (typeof data.refresh === "string") {
        const newBoard = new Board(data.refresh);
        const movePos = this.state.board.moveStringToMovePos(data.refresh.substring(data.refresh.length - 5));
        const lastMovePrev = movePos[0];
        const lastMoveAfter = movePos[1];
        this.setState({
            board: newBoard,
            lastMovePrev: lastMovePrev,
            lastMoveAfter: lastMoveAfter,
            moveString: data.refresh
        });
    } else {
        this.state.board.setupBoard(data.move) 
        if (this.state.board.isGameOver()) {
            App.cable.subscriptions.subscriptions[0].over({ matchId: this.props.chessMatch.id })
        }
        let newMoveString = this.state.moveString + data.move;
        const movePos = this.state.board.moveStringToMovePos(data.move);
        const lastMovePrev = movePos[0];
        const lastMoveAfter = movePos[1];
        if (this.state.moveString === "" ) {
            newMoveString = this.state.moveString + data.move;
            this.setState({
                moveString: newMoveString,
                lastMovePrev: lastMovePrev,
                lastMoveAfter: lastMoveAfter
             });
        } else {
            newMoveString = this.state.moveString + " " + data.move;
            this.setState({
                moveString: newMoveString,
                lastMovePrev: lastMovePrev,
                lastMoveAfter: lastMoveAfter
            });
        }
        this.checkAiPlayer();
    }
```
`

### Chess Queuing

To queue for a game, I used redis, a super fast system that stores key value pairs for me which persists across the lifespan of channels. When the user hits the quick match button, a modal appears which upon mounting, creates a subscription to the queuing channel, and enqueues the user. Notice that I first check for existing subscriptions and remove them, so that my two subscriptions (chess matches and queuing) do not conflict with each other, and that I set a timeout on the app cable subscription creation since that is an asynchronous process.

![Chess Queue Demo](demos/queue.gif)

`
```

    componentDidMount() {
        if (App.cable.subscriptions.subscriptions.length > 0) {
            App.cable.subscriptions.remove(App.cable.subscriptions['subscriptions'][0])
        }
        
        App.cable.subscriptions.create(
            { channel: "QueueChannel" },
            {
                received: data => {
                    this.props.closeModal();
                    this.props.history.replace(`/matches/${data.matchId}`);
                },
                queue: function(data) {
                    return this.perform("queue", data);
                },
                dequeue: function() {
                    return this.perform("dequeue")
                }
            }
        );
        setTimeout(() => App.cable.subscriptions.subscriptions[0].queue({ playerUsername: this.props.currentUser.username }), 1000) 

    }
    
    
    componentWillUnmount() {
        App.cable.subscriptions.subscriptions[0].dequeue();
    }
```
`

The actual backend queuing system was a simple feature. Since I am not yet checking for ranges of elos, I only need to check if another player was already in the queue or not. If yes, pair them together. If not, put that player in the queue

`
```
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
```
`
## Future Goals
I had so many ideas for this app but not enough time, so here are features that will arrive eventually:

* Hard difficulty AI
* User Rankings
* Animated gameplay
* Puzzles for your chess training
* Display a users profile page, which contains the history of the users matches, their elos, and their win percentages
* Integrate ranked match making, with an +/- elo system
* Integrate multiple game modes that have different time constraints
