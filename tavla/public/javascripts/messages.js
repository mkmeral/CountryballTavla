(function (exports) {

    /*
     * Server to client: Game is finished with status code X
     * X = 1 : You won,
     * X = 2 : You lost,
     * X = 3 : Rival Surrendered
     * X = 0 : Game Aborted,
     */
    exports.T_FINISH_CODE = "FINISH-CODE";
    exports.O_FINISH_CODE= {
        type: exports.T_FINISH_CODE,
        data: null
    };

    /*
     * Client to Server: Request validity check, if so apply.
     */
    exports.T_REQUEST_MOVE = "REQUEST-MOVE";
    exports.O_REQUEST_MOVE = {
        type: exports.T_REQUEST_MOVE,
        data: null
    };

    /*
     * Server to Client: Relay a valid move from opponent as well as dice output
     */
    exports.T_RELAY_MOVE = "RELAY-MOVE";
    exports.O_RELAY_MOVE = {
        type: exports.T_RELAY_MOVE,
        data: null
    };

    /*
     * Server to Client : Waiting for another player
     */
    exports.T_WAIT = "WAIT";
    exports.O_WAIT = {
        type: exports.T_WAIT
    };
    exports.S_WAIT = JSON.stringify(exports.O_WAIT);

    /*
     * Server to Client : The move is invalid!
     */
    exports.T_INVALID = "INVALID";
    exports.O_INVALID = {
        type: exports.T_INVALID
    };
    exports.S_INVALID = JSON.stringify(exports.O_INVALID);

    /*
     * Server to Client: Game is ready
     * If player is to start, data will contain dice info
     */
    exports.T_READY = "READY";
    exports.O_READY = {
        type: exports.T_READY,
        data: null
    };

    /*
     * Client to Server: Surrender
     */
    exports.T_SURRENDER = "SURRENDER";
    exports.O_SURRENDER = {
        type: exports.T_SURRENDER
    };
    exports.S_SURRENDER = JSON.stringify(exports.O_SURRENDER);

    /*
     * InApp Messaging, with limited options in this array
     */
    exports.MESSAGES = [
        {id: 0, text:"Good Game"},
        {id: 1, text:"Eazy Peazy"},
        {id: 2, text:"Such Luck Much Wow"},
    ];

    /*
     * Client to Server: Send a message to the other user with id X
     */
    exports.T_SEND_MESSAGE = "SEND-MESSAGE";
    exports.O_SEND_MESSAGE = {
        type: exports.T_SEND_MESSAGE,
        data: null
    };

    /*
     * Server to Client: Message coming from opponent
     */
    exports.T_RELAY_MESSAGE = "RELAY-MESSAGE";
    exports.O_RELAY_MESSAGE = {
        type: exports.T_RELAY_MESSAGE,
        data: null
    };

}(typeof exports === "undefined" ? this.Messages = {} : exports));