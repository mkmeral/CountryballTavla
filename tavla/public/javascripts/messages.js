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