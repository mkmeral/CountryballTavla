var Board = require('./board.js');
exports = function (con, country) {
    this.con = con;
    this.country = country;
    this.board = new Board();
};