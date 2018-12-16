var config = require('./public/javascripts/config.js');
var board = function () {
    this.board = config.DEFAULT_BOARD;
    this.pips = 167;
    this.moves=[];    // {from: x, to: y} or {message: x, played: false};
};

/*
    Check if the move is valid based on dice outcome
 */
board.prototype.isMoveValid = function(move, dice){
    let displacement = move.from - move.to;

    if(displacement<=0)
        return false;

    if(dice[0] === dice[1])
        return ((displacement%dice[0])===0 && displacement/dice[0]<4);
    else
        return (displacement === dice[0] || displacement === dice[1] || displacement === dice[0] + dice[1]);
};

/*
    Try to make the move
    true if move is done
    false if move can not be done
 */
board.prototype.move = function (move, dice, p2Board) {
    if(!this.isMoveValid(move, dice))
        return false;

    let blocked = false;
    for(let i = 0; i<p2Board.length; i++){
        if(p2Board[i] === move.to) {
            if (blocked)
                return false;

            blocked = i;
        }
    }

    this.board.forEach(function (position) {
        if(position === move.from) {
            position = move.to;

            // Broke the rival's checkers
            if(blocked)
                p2Board[blocked] = 25;

            this.moves.push(move);
            return true;
        }
    });

    return false;
};

/*
    Check if the player is finished the game
 */
board.prototype.isFinished = function () {
    // Check if every element is under 0, meaning collected
    this.board.forEach(function (checker) {
        if(checker>0)
            return false;
    });
    return true;
};

exports = board;