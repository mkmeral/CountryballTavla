var websocket = require("ws");
var http = require('http');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var stats =  require('./appStat.js');
var indexRouter = require('./routes/index');
var Game = require('./tavla').game;
var PlayerClass = require('./player.js');
var app = express();
port = process.argv[2];
var server = http.createServer(app);

var messages = require("./public/javascripts/messages");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var wss = new websocket.Server({server});
var currentGame = new Game(stats.games++, new Date().getTime());
var connectionId = 0;

wss.on("on", function (ws) {

    ws.id = connectionId++;
    player = new PlayerClass(ws);

    currentGame.addPlayer(player)
    stats.websockets[ws.id] = currentGame;;

    // If it's the first user, tell to wait
    if (currentGame.p1 === player){
        ws.send(messages.S_WAIT);
    }else{
        // Otherwise roll the dice, and start the game!
        let dice = currentGame.throwDice();
        let starterMessage = messages.O_READY;
        starterMessage.data = dice;
        if(Math.random()<0.5){
            ws.send(JSON.stringify(starterMessage));
            currentGame.p1.con.send(JSON.stringify(messages.O_READY));
        }else{
            ws.send(JSON.stringify(JSON.stringify(messages.O_READY)));
            currentGame.p1.con.send(JSON.stringify(starterMessage));
        }
    }

    /*
     * If current game is full, create a new one
     */
    if(currentGame.isFull()){
        currentGame = new Game(stats.games++, new Date().getTime());
    }

    ws.on("message", function (message) {
        let gameObj = stats.websockets[ws.id];
        let player = gameObj.returnPlayer(ws);
        let opponent = gameObj.p1;
        if(opponent === player)
            opponent = gameObj.p2;
        let oMsg = JSON.parse(message);

        /*
         * If user wants to send message
         */
        if(oMsg.type === messages.T_SEND_MESSAGE && oMsg.data < messages.MESSAGES.length){
            let m = messages.O_RELAY_MESSAGE;
            m.data = oMsg.data;
            opponent.con.send(JSON.stringify(m));
        }

        /*
         * If user wants to surrender
         */
        if(oMsg.type === messages.T_SURRENDER){
            let surrendered = messages.O_FINISH_CODE;
            surrendered.data = 3;
            opponent.con.send(JSON.stringify(surrendered));
        }

        /*
         * If user wants to make a move
         */
        if(oMsg.type === messages.T_REQUEST_MOVE){
            // Check if move is valid
            if(gameObj.move(player, oMsg.data)){

                // Check if the user started to collect checkers
                if(oMsg.data.to<0){
                    let finished = gameObj.isFinished();

                    // Check if any of the users are finished
                    if(finished!==0){
                        let won = messages.O_FINISH_CODE;
                        won.data = 1;
                        let lost = message.O_FINISH_CODE;
                        lost.data = 2;

                        /*
                         * Send won and lost messages depending on winner
                         * Close the websockets
                         */
                        if(finished===1){
                            gameObj.p1.con.send(JSON.stringify(won));
                            gameObj.p2.con.send(JSON.stringify(lost));
                            gameObj.p1.con.close();
                            gameObj.p2.con.close();
                        }else{
                            gameObj.p1.con.send(JSON.stringify(lost));
                            gameObj.p2.con.send(JSON.stringify(won));
                            gameObj.p1.con.close();
                            gameObj.p2.con.close();
                        }
                    }
                }

                // Tell the player that the move is valid and played
                ws.send(messages.S_VALID);

                // Relay the valid move, also by adding new thrown dice
                let m = messages.O_RELAY_MOVE;
                m.data = {
                    dice: gameObj.throwDice(),
                    move: oMsg.data
                };
                opponent.con.send(JSON.stringify(m));
            }else{
                // If move is not valid, return invalid
                ws.send(messages.S_INVALID);
            }
        }
    });

    ws.on("close", function (message) {
        // If User closes the websocket let the opponent know player is surrendered.
        let gameObj = stats.websockets[ws.id];
        let player = gameObj.returnPlayer(ws);
        let opponent = gameObj.p1;
        if(opponent === player)
            opponent = gameObj.p2;

        if(gameObj.gameState < 5){
            let m = messages.O_FINISH_CODE;
            m.data = 3
            opponent.send(JSON.stringify(m));
        }
    });
});

server.listen(port);