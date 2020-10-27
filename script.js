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
    })
    const threeInRow = (a, b, c) => {
        return a === b && b === c && a !== undefined;
    }
    const checkWinner = () => {
        if (threeInRow(gameboard.board[0], gameboard.board[1], gameboard.board[2])) {
            winner = gameboard.board[0];
            displayWinner();
            return true;
        }
        if (threeInRow(gameboard.board[3], gameboard.board[4], gameboard.board[5])) {
            winner = gameboard.board[3];
            displayWinner();
            return true;
        }
        if (threeInRow(gameboard.board[6], gameboard.board[7], gameboard.board[8])) {
            winner = gameboard.board[6];
            displayWinner();
            return true;
        }
        if (threeInRow(gameboard.board[0], gameboard.board[3], gameboard.board[6])) {
            winner = gameboard.board[0];
            displayWinner();
            return true;
        }
        if (threeInRow(gameboard.board[1], gameboard.board[4], gameboard.board[7])) {
            winner = gameboard.board[1];
            displayWinner();
            return true;
        }
        if (threeInRow(gameboard.board[2], gameboard.board[5], gameboard.board[8])) {
            winner = gameboard.board[2];
            displayWinner();
            return true;
        }
        if (threeInRow(gameboard.board[0], gameboard.board[4], gameboard.board[8])) {
            winner = gameboard.board[0];
            displayWinner();
            return true;
        }
        if (threeInRow(gameboard.board[2], gameboard.board[4], gameboard.board[6])) {
            winner = gameboard.board[2];
            displayWinner();
            return true;
        }
        if (gameboard.board.length === 9 && !gameboard.board.includes(undefined)) {
            displayTie();
            return true;
        }
        else {
            return false;
        }
    }
    const displayWinner = () => {
        if (document.querySelector('.winner-message') !== null) return;
        document.querySelectorAll('.winner-message')
        let winningPlayer = document.querySelector('[player-name="' + winner + '"]');
        winningPlayer.classList.add('player-winner');
        let winnerMessage = document.createElement('div');
        winnerMessage.classList.add('winner-message');
        winnerMessage.innerHTML = winner + " wins!";
        document.querySelector("#container").append(winnerMessage);
    }
    const displayTie = () => {
        if (document.querySelector('.winner-message') !== null) return;
        let winnerMessage = document.createElement('div');
        winnerMessage.classList.add('winner-message');
        winnerMessage.innerHTML = 'Player 1 and Player 2 tie.';
        document.querySelector("#container").append(winnerMessage);
    }
    return {
        board,
        create,
        checkWinner
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
    }
}

const gameflow = (() => {
    let player1 = player("Player 1", "X");
    let player2 = player("Player 2", "O");
    const createPlayerDisplays = () => {
        player1.createPlayerDisplay(player1.name, player1.symbol);
        player2.createPlayerDisplay(player2.name, player2.symbol);
    }
    let activePlayer = player1;
    const activePlayerHighlight = (activePlayer) => {
        let activePlayerDiv = document.querySelector('[player-name="' + activePlayer.name + '"]');
        activePlayerDiv.classList.add('player-active');
    }
    const switchPlayer = () => {
        const player1Display = document.querySelector('[player-name="' + player1.name + '"]');
        const player2Display = document.querySelector('[player-name="' + player2.name + '"]');
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
    }
    const markSpot = (e) => {
        e.target.innerHTML = activePlayer.symbol;
    }
    const updateArray = (e) => {
        let index = e.target.getAttribute("array-index");
        gameboard.board[index] = activePlayer.name;
    }
    return {
        createPlayerDisplays,
        activePlayerHighlight,
        activePlayer,
        switchPlayer,
        markSpot,
        updateArray
    }
})();

function initialize() {
    gameboard.create();
    gameflow.createPlayerDisplays();
    gameflow.activePlayerHighlight(gameflow.activePlayer);

    clickSquare = (e) => {
        if (gameboard.board[e.target.getAttribute("array-index")] !== undefined) {
            return;
        }
        let gameOver = gameboard.checkWinner();
        if (!gameOver) {
            gameflow.markSpot(e);
            gameflow.updateArray(e);
            gameflow.switchPlayer();
            gameboard.checkWinner();
        }
    }
    
    clearBoard = () => {
        gameboard.board = [];
        document.querySelectorAll('.square').forEach(div => div.innerHTML = '');
        document.querySelector('.winner-message').remove();
        let allPlayers = document.querySelectorAll('.player-display');
        allPlayers.forEach(div => div.classList.remove('player-winner'));
    }

    document.querySelectorAll('.square').forEach(div => div.addEventListener("click", clickSquare));

    let restartButton = document.createElement('button');
    restartButton.innerText = 'Reset Game';
    document.querySelector("#container").appendChild(restartButton);
    restartButton.addEventListener("click", clearBoard);
}

initialize();