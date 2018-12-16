function GameBoard(ws){
    this.ws = ws;
    this.user = {
        board: config.DEFAULT_BOARD,
        cball: null,
        imgs: [],
    };
    this.opponent = {
        board: [],
        cball: null,
        imgs: [],
    };
    this.submittedMove = null;
    this.start = null;
    this.dice = null;

    this.setup = function(userCBall, opponentCBall){
        this.user.cball = userCBall;
        this.opponent.cball = opponentCBall;

        // Setup opponent board
        // It should be on the other side
        config.DEFAULT_BOARD.forEach(function (checker) {
            this.opponent.board.push(25-checker);
        });

        // Setup board by putting checkers in places
        this.user.board.forEach(function (checker) {
            let checkerEelement = $("<img>");
            checkerElement.src = user.cball;
            this.user.imgs.push(checkerEelement);
            $("#"+checker).appendChild(checkerEelement);
        });
        opponent.board.forEach(function (checker) {
            let checkerEelement = $("<img>");
            checkerElement.src = opponent.cball;
            this.opponent.imgs.push(checkerEelement);
            $("#"+checker).appendChild(checkerEelement);
        });


        // Start timer
        this.start = new Date().getTime();
        setInterval(this.setTime, 1000);
    };

    this.makeMove = function (isUser, from, to) {
        let board = this.opponent.board;
        let imgs = this.opponent.imgs;

        if(isUser){
            board = this.user.board;
            imgs = this.user.imgs;
        }

        let i = 0;
        while(board[i]!==from){
            i++;
        }
        this.moveAnimation(imgs[i], $("#"+to));
        board[i] = to;
    };

    this.moveAnimation = function(element, newParent){
        //Allow passing in either a jQuery object or selector
        element = $(element);
        newParent= $(newParent);

        var oldOffset = element.offset();
        element.appendTo(newParent);
        var newOffset = element.offset();

        var temp = element.clone().appendTo('body');
        temp.css({
            'position': 'absolute',
            'left': oldOffset.left,
            'top': oldOffset.top,
            'z-index': 1000
        });
        element.hide();
        temp.animate({'top': newOffset.top, 'left': newOffset.left}, 'slow', function(){
            element.show();
            temp.remove();
        });
    };

    this.setMessage = function (message) {
        let modal = $("#message");
        modal.empty();
        modal.innerHTML = "<h2>" + message + "</h2>";
        modal.addClass("active");
    };

    this.clearMessage = function () {
        let modal = $("#message");
        modal.removeClass("active");
    };

    this.setMessageFor = async function(message, interval, callback) {
        this.setMessage(message);
        await sleep(interval);
        this.clearMessage();
        callback();
    };

    this.sendMessage = function (id) {
        let m = messages.O_SEND_MESSAGE;
        m.data = id;
        this.ws.send(JSON.stringify(m));
    };

    this.submitMove = function (move) {
        this.submittedMove = move;
        let m = messages.O_REQUEST_MOVE;
        m.data = this.submittedMove;
        this.ws.send(JSON.stringify(m));
    };

    this.setTime = function () {
        let t = $("#time");
        t.empty();
        var seconds = Math.floor((milli / 1000) % 60);
        var minutes = Math.floor((milli / (60 * 1000)) % 60);

        t.innerText = minutes + ":" +seconds;
    };

    this.setDice = function(dice){
        this.dice = dice;
        // TODO: Implement display part
    };

    this.highlighAvailable = function () {
        // TODO: İmplememt;
    }
    /*
     * Setup game
     * move
     *  display dice
     *  highligh available
     *  select from
     *  select to
     *  sent to server
     *  wait for feedback
     *  animate if ok
     *  go back if invalid
     *
     * getmove
     *
     * hit
     *
     * send message
     * display message
     *
     * finish game
     */

}

(function setup() {
    ws = new WebSocket(config.WEB_SOCKET_URL);

    gBoard = new GameBoard(ws);

    gBoard.setMessage("Trying to find an opponent!");

    ws.onmessage = function (event) {

        let msg = JSON.parse(event);

        if(msg.type === messages.T_RELAY_MESSAGE)
            gBoard.setMessageFor(messages.MESSAGES[msg.data], 3000);

        if(msg.type === messages.T_FINISH_CODE){
            switch (msg.data) {
                case 1:
                    gBoard.setMessageFor("YOU WON!", 5000, function () {
                        window.location.href = "/";
                    });
                    break;
                case 2:
                    gBoard.setMessageFor("YOU LOST!", 5000, function () {
                        window.location.href = "/";
                    });
                    break;
                case 3:
                    gBoard.setMessageFor("RIVAL HAS SURRENDERED!!", 5000, function () {
                        window.location.href = "/";
                    });
                    break;
                case 4:
                    gBoard.setMessageFor("GAME IS ABORTED!", 5000, function () {
                        window.location.href = "/";
                    });
                    break;
            }
        }

        if(msg.type === messages.T_VALID){
            gBoard.makeMove(true, gBoard.submittedMove.from, gBoard.submittedMove.to);
        }

        if(msg.type === messages.T_RELAY_MOVE){
            gBoard.makeMove(false, msg.data.move.from, msg.data.move.to);
            gBoard.setMessageFor("Your Turn!, 1000", function () {
                gBoard.setDice(msg.data.dice);
                gBoard.highlighAvailable();
            });
        }

        if(msg.type === messages.T_INVALID){
            gBoard.setMessageFor("Invalid Move!\nTry again!, 1000", function () {
                gBoard.setDice(msg.data.dice);
                gBoard.highlighAvailable();
            });
        }
    };
})();