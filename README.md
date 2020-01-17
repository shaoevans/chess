# README

It is a single-page web-app, using Ruby on Rails and React.js

The inspiration for this project came from Lichess.org, the free Correspondence Chess site. The original idea was to copy and implement all lichess features, and then later add a checkers playing option to the website.

## Current Functionality Highlights

* Hand-rolled User Authentication using BCrypt
* Single Page Application, using React
* The illusion and convenience of multiple pages using React-Router
* Asynchronous HTTP requests using jQuery's Ajax
* Users can challenge other Users or the Computer
* The chess match board is rotated depending on which side if you are white or black
* Hard AI uses a tree of all possible game outcomes to play a flawless game
* Leave current game at anytime and come back later to replay the game; every submitted move is saved to the db
* Spectators can currently only visit the game by its link, but once there they can spectate the game live and will not be able to interact with the board in any way to affect the match
* Users can open any previous game, to view the ending state of the game, and will eventually be able to scroll over the board see the game progression
* Users can post on the forums to discuss their thoughts or review their chess games, will be eventually able to directly post   a chess game to the forum
* Users can edit only their posts if they wish to
* Users can read blog posts on the website via the the all index or by year and fetch more using infinite scrolling
* Users can search for other users in the nav search bar, which will bring the user to a profile page
* Users can search the forums for forum posts that have an author, title, or comment which contains that keyword
* Posts, comments, and blogs are all paginated so that the user is not overwhelmed with data

## Implementing Chess Game Logic in the Backend

The core functionality of the website is to be able to play chess. To start, I wrote a chess backend
The trickier features to implement were check, checkmate, and castling. To solve check, I put into consideration that eventually I would be using a polytreenode to come up with moves for my AI, and would need a faster way of seeing if the king was in checkmate than by iterating over every single piece and seeing if they had any valid moves that included the king of the opposite color's locations. To solve this, I added two solutions: 

* To check for check, instead of iterating over the pieces of the opposite color and seeing if their pieces valid moves included the current king's position, I instead changed it so that the king would would look at every vector possible, grab the last tile in that vector (vectors only stop growing when they hit a piece or if they hit the edge of the board) and seeing if that tile contained a piece of the opposite color capable of producing such a vector 

`
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
`

* I was originally thinking that checkmate, which does involve iterating over every piece of the opposite color an
* Adding a whitePieces and blackPieces array which stores all black and white pieces, and update whenever a piece is removed from the game. This would allow checking for checkmate faster by reducing the amount of pieces that would need to be checked from a total of 64 to 16 in cases of checkmate.



## Future Goals
I had so many ideas for this app but not enough time, so here are features that will arrive eventually:

* Hard difficulty AI
* User Rankings
* Animated gameplay
* Puzzles for your chess training
* Display a users profile page, which contains the history of the users matches, their elos, and their win percentages
* Integrate ranked match making, with an +/- elo system
* Integrate multiple game modes that have different time constraints
