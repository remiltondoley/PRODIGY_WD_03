const board = document.getElementById('board');
const status = document.getElementById('status');
let cells = [];
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
  board.innerHTML = '';
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
    cells.push('');
  }
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer);

  if (checkWinner()) {
    status.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  } else if (!cells.includes('')) {
    status.textContent = `It's a draw! 🤝`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  createBoard();
}

createBoard();
