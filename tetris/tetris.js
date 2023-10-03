document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    let board = [];
    let activePiece = null;
    let intervalId = null;
    let score = 0;
  
    // Initialize the game board with cells
    for (let i = 0; i < 200; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      gameBoard.appendChild(cell);
      board.push(cell);
    }
  
    // Tetromino shapes and their rotations
    const tetrominoes = [
      [[1, 11, 21, 31], [10, 11, 12, 13], [1, 11, 21, 31], [10, 11, 12, 13]],
      [[1, 2, 11, 21], [10, 11, 12, 22], [1, 11, 21, 20], [10,11, 12, 0]],
      [[0, 10, 20, 30], [0, 1, 2, 10], [0, 10, 20, 30], [0, 1, 2, 12]],
      [[0, 1, 11, 21], [11, 12, 13, 1], [2, 12, 22, 21], [10, 11, 12, 22]],
      [[1, 11, 12, 13], [1, 11, 21, 10], [0, 1, 2, 12], [11, 21, 20, 19]],
      [[1, 10, 11, 12], [1, 10, 11, 21], [10, 11, 12, 21], [1, 11, 12, 13]],
      [[1, 11, 21, 20], [10, 11, 12, 2], [0, 1, 11, 21], [10, 11, 12, 22]]
    ];
  
    // Generate a new random tetromino piece
    function getRandomPiece() {
      const random = Math.floor(Math.random() * tetrominoes.length);
      const tetromino = tetrominoes[random];
      return tetromino;
    }
  
    // Draw the active piece on the board
    function draw() {
      clear();
      activePiece.positions[activePiece.rotation].forEach((index) => {
        board[activePiece.currentPosition + index].classList.add('active');
      });
    }
  
    // Clear the board
    function clear() {
      board.forEach((cell) => {
        cell.classList.remove('active');
      });
    }
  
    // Move the active piece down
    function moveDown() {
      if (!isCollision(activePiece.currentPosition + 10, activePiece.rotation)) {
        activePiece.currentPosition += 10;
      } else {
        lockPiece();
        checkRows();
        checkGameOver();
        activePiece = createPiece();
      }
      draw();
    }
  
    // Move the active piece left
    function moveLeft() {
      if (!isCollision(activePiece.currentPosition - 1, activePiece.rotation)) {
        activePiece.currentPosition -= 1;
      }
      draw();
    }
  
    // Move the active piece right
    function moveRight() {
      if (!isCollision(activePiece.currentPosition + 1, activePiece.rotation)) {
        activePiece.currentPosition += 1;
      }
      draw();
    }
  
    // Rotate the active piece
    function rotate() {
      const nextRotation = (activePiece.rotation + 1) % 4;
      if (!isCollision(activePiece.currentPosition, nextRotation)) {
        activePiece.rotation = nextRotation;
      }
      draw();
    }
  
    // Check for collision with the board or other tetrominoes
    function isCollision(position, rotation) {
      const currentPosition = activePiece.positions[rotation].map((index) => {
        return index + position;
      });
  
      return currentPosition.some((index) => {
        return (board[index] &&
          (board[index].classList.contains('active') ||
            index % 10 === 9 ||
            index % 10 === 0));
      });
    }
  
    // Lock the active piece on the board
    function lockPiece() {
      activePiece.positions[activePiece.rotation].forEach((index) => {
        board[activePiece.currentPosition + index].classList.add('active');
      });
    }
  
    // Check and remove completed rows
    function checkRows() {
      const rowsToDelete = [];
      for (let i = 0; i < board.length; i += 10) {
        const row = board.slice(i, i + 10);
        if (row.every((cell) => cell.classList.contains('active'))) {
          rowsToDelete.push(...row);
          score += 10;
        }
      }
  
      rowsToDelete.forEach((cell) => {
        cell.classList.remove('active');
      });
  
      if (rowsToDelete.length > 0) {
        for (let i = rowsToDelete.length - 1; i >= 0; i--) {
          const index = board.indexOf(rowsToDelete[i]);
          board.splice(index, 1);
        }
        for (let i = 0; i < rowsToDelete.length; i++) {
          board.unshift(document.createElement('div'));
          board[0].classList.add('cell');
          gameBoard.prepend(board[0]);
        }
      }
    }
  
    // Check if the game is over
    function checkGameOver() {
      if (board.slice(0, 10).some((cell) => cell.classList.contains('active'))) {
        clearInterval(intervalId);
        alert(`Game Over! Your score: ${score}`);
        location.reload();
      }
    }
  
    // Start the game
    function startGame() {
      activePiece = createPiece();
      draw();
      intervalId = setInterval(moveDown, 1000);
    }
  
    // Event listeners for user input
    document.addEventListener('keydown', (event) => {
      if (event.code === 'ArrowDown') {
        moveDown();
      } else if (event.code === 'ArrowLeft') {
        moveLeft();
      } else if (event.code === 'ArrowRight {
        moveRight();
      } else if (event.code === 'ArrowUp') {
        rotate();
      }
    });
  
    // Generate and assign a random piece to the activePiece
    function createPiece() {
      const piece = getRandomPiece();
      return {
        positions: piece,
        rotation: 0,
        currentPosition: 4
      };
    }
  
    startGame();
  });
  