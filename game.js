class Gameboard {
    width = 3;
    height = 3;
    cellWidth = 266.67;
    cellHeight = 266.67;
    gameContainer = null;

    initialize() {
        this.gameContainer = document.querySelector("#game-container");

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                var newCell = new Cell(this.cellWidth, this.cellHeight, x, y);
                this.appendCell(newCell);
            }
        }
    }

    appendCell(cell) {
        this.gameContainer.appendChild(cell.Element);
    }
}