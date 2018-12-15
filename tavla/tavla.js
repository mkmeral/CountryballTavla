var game = function (p1, p2, time) {
    this.p1 = p1;
    this.p2 = p2;
    this.time = time;
    this.gameState = "INIT";
};

game.prototype.states = {};
game.prototype.states["INIT"] = 0;
game.prototype.states["1 IN"] = 1;
game.prototype.states["2 IN"] = 2;
game.prototype.states["WAIT 1"] = 3;
game.prototype.states["WAIT 2"] = 4;
game.prototype.states["WON 1"] = 5;
game.prototype.states["WON 2"] = 6;
game.prototype.states["ABORTED"] = 7;


/*
    Check if any of the users are finished,
    If finished, return player no -> 1 or 2
    else return 0
 */
game.prototype.isFinished = function () {
    if(this.p1.board.isFinished())
        return 1;
    else if(this.p2.board.isFinished())
        return 2;
    else
        return 0;
};

game.prototype.addPlayer = function(p) {
    if (this.states[this.gameState] === 0){
        this.p1 = p;
        return 1;
    }else if(this.states[this.gameState] === 1) {
        this.p2 = p;
        return 2;
    }else{
        return 0;
    }
};

game.prototype.isFull = function () {
    return this.states[this.gameState]>1;
};

game.prototype.move = function (p, move, dice) {
    let result = false;
    if(p === this.p1 && this.states[this.gameState] === 5){
        result = this.p1.board.move(move, dice, this.p2.board);
        if(result && move.to<0){}
            this.gameState = "WON 1";
        if(result)
            this.gameState = "WAIT 2";
    }else if(p === this.p2 && this.states[this.gameState] === 6){
        result = this.p2.board.move(move, dice, this.p1.board);
        if(result && move.to<0){}
            this.gameState = "WON 2";
        if(result)
            this.gameState = "WAIT 1";
    }
    return result;
};

expors.game = game;