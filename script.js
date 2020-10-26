const gameboard = (() => {
    let board = [];
    let winner = null;
    const create = (() => {
        for (let i = 0; i < 9; i++) {
            const gameSquare = document.createElement('div');
            gameSquare.classList.add('square');
            gameSquare.setAttribute("array-index",i)
            document.querySelector("#container").appendChild(gameSquare);
        }
    })();
    const threeInRow = (a, b, c) => {
        return a === b && b === c && a !== undefined;
    }
    const checkWinner = () => {
        if (threeInRow(board[0], board[1], board[2])) {
            winner = board[0];
            displayWinner();
            console.log('checkWinner 1');
            return true;
        }
        if (threeInRow(board[3], board[4], board[5])) {
            winner = board[3];
            displayWinner();
            console.log('checkWinner 2');
            return true;
        }
        if (threeInRow(board[6], board[7], board[8])) {
            winner = board[6];
            displayWinner();
            console.log('checkWinner 3');
            return true;
        }
        if (threeInRow(board[0], board[3], board[6])) {
            winner = board[0];
            displayWinner();
            console.log('checkWinner 4');
            return true;
        }
        if (threeInRow(board[1], board[4], board[7])) {
            winner = board[1];
            displayWinner();
            console.log('checkWinner 5');
            return true;
        }
        if (threeInRow(board[2], board[5], board[8])) {
            winner = board[2];
            displayWinner();
            console.log('checkWinner 6');
            return true;
        }
        if (threeInRow(board[0], board[4], board[8])) {
            winner = board[0];
            displayWinner();
            console.log('checkWinner 7');
            return true;
        }
        if (threeInRow(board[2], board[4], board[6])) {
            winner = board[2];
            displayWinner();
            console.log('checkWinner 8');
            return true;
        }
        if (board.length === 9 && !board.includes(undefined)) {
            displayTie();
            console.log('checkWinner 9');
            return true;
        }
        else {
            console.log('checkWinner 10');
            return false;
        }
    }
    const displayWinner = () => {
        removePlayerHighlight();
        let winningPlayer = document.querySelector('[player-name="' + winner + '"]');
        winningPlayer.classList.add('player-winner');
    }
    const displayTie = () => {
        removePlayerHighlight();
    }
    const removePlayerHighlight = () => {
        let allPlayers = document.querySelectorAll('.player-display');
        allPlayers.forEach(div => div.classList.remove('player-active'));
        allPlayers.forEach(div => div.classList.remove('player-winner'));
    }
    const clearBoard = () => {
        gameboard.board = [];
        document.querySelectorAll('.square').forEach(div => div.innerHTML = '');
        winner = null;
        removePlayerHighlight();
    }
    const restartButton = (() => {
        let restartButton = document.createElement('button');
        restartButton.innerText = 'Reset Game';
        document.querySelector("#container").appendChild(restartButton);
        restartButton.addEventListener("click", clearBoard);
    })();
    return {
        board,
        checkWinner,
        }
})();

const player = (name, symbol) => {
    let playerContainer = document.querySelector('#player-container');
    const createPlayerDisplay = (name, symbol) => {
        let playerDiv = document.createElement('div');
        playerDiv.innerText = symbol + " – " + name;
        playerDiv.setAttribute('player-name', name);
        playerDiv.classList.add('player-display');
        playerContainer.appendChild(playerDiv);
    }
    return {
        name,
        symbol,
        createPlayerDisplay
    };
};

const gameflow = (() => {
    const player1 = player("Player 1", "X");
    const player2 = player("Player 2", "O");
    const createPlayerDisplays = (() => {
        player1.createPlayerDisplay(player1.name, player1.symbol);
        player2.createPlayerDisplay(player2.name, player2.symbol);
    })();
    const player1Display = document.querySelector('[player-name="' + player1.name + '"]');
    const player2Display = document.querySelector('[player-name="' + player2.name + '"]');
    let activePlayer = player1;
    const switchPlayer = () => {
        if (activePlayer === player1) {
            activePlayer = player2;
            player1Display.classList.remove('player-active');
            player2Display.classList.add('player-active');
        }
        else if (activePlayer === player2) {
            activePlayer = player1;
            player2Display.classList.remove('player-active');
            player1Display.classList.add('player-active');
        }
    };
    const markSpot = (e) => {
        e.target.innerHTML = activePlayer.symbol;
    }
    const updateArray = (e) => {
        let index = e.target.getAttribute("array-index");
        gameboard.board[index] = activePlayer.name;
    }
    return {
        switchPlayer,
        markSpot,
        updateArray
    }
})();

function initialize() {
    function clickSquare(e) {
        if (gameboard.board[e.target.getAttribute("array-index")] !== undefined) {
            console.log("gameboard already full here");
            return;
        }
        let gameOver = gameboard.checkWinner();
        console.log("gameOver is " + gameOver);
        if (!gameOver) {
            gameflow.markSpot(e);
            gameflow.updateArray(e);
            gameflow.switchPlayer();
            gameboard.checkWinner();
        }
    }
    document.querySelectorAll('.square').forEach(div => div.addEventListener("click", clickSquare));
}

initialize();