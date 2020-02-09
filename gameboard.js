class Gameboard {
    size = 3;
    cellWidth = 266.67;
    cellHeight = 266.67;
    gameContainer = null;
    // 0 = Player One, 1 = Player Two
    currentPlayer = 0;
    playerSymbols = [
        "X",
        "O"
    ];
    cells = [];
    isStarted = false;

    initialize() {
        this.gameContainer = document.querySelector("#game-container");

        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let newCell = new GameCell(this.cellWidth, this.cellHeight, x, y);
                this.appendCell(newCell);

                if (!this.cells[x])
                    this.cells[x] = [];

                this.cells[x][y] = newCell;

                newCell.onActivate = this.onCellActivated;
            }
        }
        //Temporary
        this.isStarted = true;
        console.log(this.cells);
    }

    appendCell(cell) {
        this.gameContainer.appendChild(cell.Element);
    }

    onCellActivated = (cell) => {
        if (this.isStarted) {
            cell.setValue(this.playerSymbols[this.currentPlayer]);
            this.checkForWinner();
            this.checkDraw();
            this.currentPlayer++;
            if (this.currentPlayer >= this.playerSymbols.length) {
                this.currentPlayer = 0;
            }
        }
    }

    checkForWinner = () => {
        let result = false;
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let currentCell = this.cells[x][y];

                result =
                    this.checkForHorizontalWin(currentCell) ||
                    this.checkForVerticalWin(currentCell) ||
                    this.checkForDiagonalWin(currentCell);

                this.checkResult(result);
                if (result) break;
            }
            if (result) break;
        }
    }

    checkForHorizontalWin = (cell) => {
        let result = false;
        let symbol = cell.TextContainer.innerText;

        if (symbol.length > 0) {

            let foundCtr = 1;
            // Check for Left
            for (let x = cell.x - 1; x >= 0; x--) {
                let currentCell = this.cells[x][cell.y];
                var currentSymbol = currentCell.TextContainer.innerText;
                if (currentSymbol == symbol) foundCtr++;
            }

            // Check for Right
            for (let x = cell.x + 1; x < this.size; x++) {
                let currentCell = this.cells[x][cell.y];
                var currentSymbol = currentCell.TextContainer.innerText;
                if (currentSymbol == symbol) foundCtr++;
            }
            if (foundCtr >= this.size)
                result = true;

        }
        return result;
    }


    checkForVerticalWin = (cell) => {
        let result = false;
        let symbol = cell.TextContainer.innerText;

        if (symbol.length > 0) {

            let foundCtr = 1;

            // Check for Up
            for (let y = cell.y - 1; y >= 0; y--) {
                let currentCell = this.cells[cell.x][y];
                var currentSymbol = currentCell.TextContainer.innerText;
                if (currentSymbol == symbol) foundCtr++;
            }

            // Check for Down
            for (let y = cell.y + 1; y < this.size; y++) {
                let currentCell = this.cells[cell.x][y];
                var currentSymbol = currentCell.TextContainer.innerText;
                if (currentSymbol == symbol) foundCtr++;
            }
            if (foundCtr >= this.size)
                result = true;

        }

        return result;
    }

    checkForDiagonalWin = (cell) => {

        let result = false;
        let symbol = cell.TextContainer.innerText;

        if (symbol.length > 0) {

            let foundCtr = 1;
            // Check for UpLeft
            let y = cell.y - 1;
            let x = cell.x - 1;
            while (y >= 0 && x >= 0) {
                let currentCell = this.cells[x--][y--];
                var currentSymbol = currentCell.TextContainer.innerText;
                if (currentSymbol == symbol) foundCtr++;
            }


            foundCtr = 1;
            // Check for DownRight
            y = cell.y + 1;
            x = cell.x + 1;
            while (y < this.size && x < this.size) {
                let currentCell = this.cells[x++][y++];
                var currentSymbol = currentCell.TextContainer.innerText;
                if (currentSymbol == symbol) foundCtr++;
            }

            foundCtr = 1;
            // Check for UpRight
            y = cell.y - 1;
            x = cell.x + 1;
            while (y >= 0 && x < this.size) {
                let currentCell = this.cells[x++][y--];
                var currentSymbol = currentCell.TextContainer.innerText;
                if (currentSymbol == symbol) foundCtr++;
            }

            foundCtr = 1;
            // Check for DownLeft
            y = cell.y + 1;
            x = cell.x - 1;
            while (y < this.size && x >= 0) {
                let currentCell = this.cells[x--][y++];
                var currentSymbol = currentCell.TextContainer.innerText;
                if (currentSymbol == symbol) foundCtr++;
            }


            if (foundCtr >= this.size)
                result = true;

        }
        return result;
    }

    checkDraw = () => {
        let isDraw = true;
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                console.log(`Is Active ${x}, ${y}  = ${this.cells[x][y].isActive}`);
                if (!this.cells[x][y].isActive) isDraw = false;
            }
        }

        console.log("Judgment", isDraw);
        if (isDraw) {
            this.isStarted = false;
            alert("Draw!!!");
        }
    }

    checkResult = (r) => {
        if (r) {
            alert(`Winner is Player: ${this.currentPlayer + 1}`);
            this.isStarted = false;
        }
    }
}