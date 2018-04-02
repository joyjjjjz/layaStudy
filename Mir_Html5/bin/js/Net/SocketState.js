var Net;
(function (Net) {
    var SocketState;
    (function (SocketState) {
        SocketState[SocketState["INIT"] = 0] = "INIT";
        SocketState[SocketState["CONNECTING"] = 1] = "CONNECTING";
        SocketState[SocketState["CHECKING"] = 2] = "CHECKING";
        SocketState[SocketState["COMMUNICATION"] = 3] = "COMMUNICATION";
        SocketState[SocketState["DISCONNECT"] = 4] = "DISCONNECT";
    })(SocketState = Net.SocketState || (Net.SocketState = {}));
})(Net || (Net = {}));
//# sourceMappingURL=SocketState.js.map