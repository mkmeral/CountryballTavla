var Board = require('./board.js');
exports = function (id, country) {
    this.id = id;
    this.country = country;
    this.board = new Board();
};