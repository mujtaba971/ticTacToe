let currentPlayer = 'X';
let cells = document.querySelectorAll('.cell');
let message = document.getElementById('message');
let winningPlayer = null;

function cellClicked(index) {
  if (!cells[index].textContent && !winningPlayer) {
    cells[index].textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let condition of winConditions) {
    let [a, b, c] = condition;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      winningPlayer = currentPlayer;
      message.textContent = `Player ${winningPlayer} wins!`;
      cells[a].style.backgroundColor = 'lightgreen';
      cells[b].style.backgroundColor = 'lightgreen';
      cells[c].style.backgroundColor = 'lightgreen';
      disableClicks();
      return;
    }
  }

  if ([...cells].every(cell => cell.textContent)) {
    message.textContent = "It's a draw!";
    disableClicks();
  }
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.backgroundColor = '#7da8657c';
  });
  currentPlayer = 'X';
  message.textContent = `Player ${currentPlayer}'s turn`;
  winningPlayer = null;
  enableClicks();
}

function disableClicks() {
  cells.forEach(cell => {
    cell.onclick = null;
  });
}

function enableClicks() {
  cells.forEach((cell, index) => {
    cell.onclick = () => cellClicked(index);
  });
}

enableClicks();
