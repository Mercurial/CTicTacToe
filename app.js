document.addEventListener("readystatechange", function () {
    if (document.readyState == "complete") {
        Program.Main();
    }
});

const _gameBoard = new Gameboard();

class Program {

    static get gameBoard() {
        return _gameBoard;
    }

    static Main() {
        Program.gameBoard.initialize();
    }
}