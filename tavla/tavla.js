var Game = function (id, time) {
    this.id = id;
    this.time = time;
    this.gameState = "INIT";
};

Game.prototype.states = {};
Game.prototype.states["INIT"] = 0;
Game.prototype.states["1 IN"] = 1;
Game.prototype.states["2 IN"] = 2;
Game.prototype.states["WAIT 1"] = 3;
Game.prototype.states["WAIT 2"] = 4;
Game.prototype.states["WON 1"] = 5;
Game.prototype.states["WON 2"] = 6;
Game.prototype.states["ABORTED"] = 7;


/*
    Check if any of the users are finished,
    If finished, return player no -> 1 or 2
    else return 0
 */
Game.prototype.isFinished = function () {
    if(this.p1.board.isFinished())
        return 1;
    else if(this.p2.board.isFinished())
        return 2;
    else
        return 0;
};

Game.prototype.addPlayer = function(p) {
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

Game.prototype.throwDice = function(){
    this.dice = [Math.floor((Math.random()*6)+1), Math.floor((Math.random()*6)+1)];
    return this.dice;
};

Game.prototype.isFull = function () {
    return this.states[this.gameState]>1;
};

Game.prototype.move = function (p, move) {
    let result = false;
    if(p === this.p1 && this.states[this.gameState] === 5){
        result = this.p1.board.move(move, this.dice, this.p2.board);
        if(result && move.to<0){}
            this.gameState = "WON 1";
        if(result)
            this.gameState = "WAIT 2";
    }else if(p === this.p2 && this.states[this.gameState] === 6){
        result = this.p2.board.move(move, this.dice, this.p1.board);
        if(result && move.to<0){}
            this.gameState = "WON 2";
        if(result)
            this.gameState = "WAIT 1";
    }
    return result;
};

Game.prototype.returnPlayer = function(con){
    if(this.p1.con === con)
        return this.p1;
    return this.p2;
};

exports.Game = Game;