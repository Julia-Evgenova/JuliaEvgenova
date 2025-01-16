class Tile {
  constructor(value, row, col) {
    this.value = value;
    this.row = row;
    this.col = col;
  }
}

class Game {
  constructor(size = 4) {
    this.size = size;
    this.grid = this.createEmptyBoard();
    this.score = 0;
  }

  createEmptyBoard() {
    return Array.from({ length: this.size }, () => Array(this.size).fill(null));
  }

  init() {
    this.grid = this.createEmptyBoard();
    this.score = 0;
    this.addRandomTile();
    this.addRandomTile();
    this.saveStateToLocalStorage();
  }

  addRandomTile() {
    const emptyCells = [];
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (!this.grid[r][c]) emptyCells.push({ r, c });
      }
    }
    if (emptyCells.length) {
      const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const value = Math.random() < 0.9 ? 2 : 4;
      this.grid[r][c] = new Tile(value, r, c);
    }
  }

  moveLeft() {
    let moved = false;
    for (let r = 0; r < this.size; r++) {
      const row = this.grid[r].filter(tile => tile !== null);
      for (let c = 0; c < row.length - 1; c++) {
        if (row[c] && row[c + 1] && row[c].value === row[c + 1].value) {
          row[c].value *= 2;
          navigator.vibrate(50);
          playSound('merge');
          this.score += row[c].value;
          row.splice(c + 1, 1);
        }
      }
      while (row.length < this.size) {
        row.push(null);
      }
      if (!this.grid[r].every((tile, i) => tile === row[i])) {
        moved = true;
      }
      this.grid[r] = row;
    }
    if (moved) {
      this.addRandomTile();
      this.saveStateToLocalStorage();
    }
  }

  moveRight() {
    let moved = false;
    for (let r = 0; r < this.size; r++) {
      const row = this.grid[r].filter(tile => tile !== null);
      for (let c = row.length - 1; c > 0; c--) {
        if (row[c] && row[c - 1] && row[c].value === row[c - 1].value) {
          row[c].value *= 2;
          navigator.vibrate(50);
          playSound('merge');
          this.score += row[c].value;
          row.splice(c - 1, 1);
        }
      }
      while (row.length < this.size) {
        row.unshift(null);
      }
      if (!this.grid[r].every((tile, i) => tile === row[i])) {
        moved = true;
      }
      this.grid[r] = row;
    }
    if (moved) {
      this.addRandomTile();
      this.saveStateToLocalStorage();
    }
  }

  moveUp() {
    let moved = false;
    for (let c = 0; c < this.size; c++) {
      const col = [];
      for (let r = 0; r < this.size; r++) {
        if (this.grid[r][c] !== null) {
          col.push(this.grid[r][c]);
        }
      }
      for (let i = 0; i < col.length - 1; i++) {
        if (col[i] && col[i + 1] && col[i].value === col[i + 1].value) {
          col[i].value *= 2;
          navigator.vibrate(50);
          playSound('merge');
          this.score += col[i].value;
          col.splice(i + 1, 1);
        }
      }
      while (col.length < this.size) {
        col.push(null);
      }
      for (let r = 0; r < this.size; r++) {
        if (this.grid[r][c] !== col[r]) {
          moved = true;
        }
        this.grid[r][c] = col[r];
      }
    }
    if (moved) {
      this.addRandomTile();
      this.saveStateToLocalStorage();
    }
  }

  moveDown() {
    let moved = false;
    for (let c = 0; c < this.size; c++) {
      const col = [];
      for (let r = 0; r < this.size; r++) {
        if (this.grid[r][c] !== null) {
          col.push(this.grid[r][c]);
        }
      }
      for (let i = col.length - 1; i > 0; i--) {
        if (col[i] && col[i - 1] && col[i].value === col[i - 1].value) {
          col[i].value *= 2;
          navigator.vibrate(50);
          playSound('merge');
          this.score += col[i].value;
          col.splice(i - 1, 1);
        }
      }
      while (col.length < this.size) {
        col.unshift(null);
      }
      for (let r = 0; r < this.size; r++) {
        if (this.grid[r][c] !== col[r]) {
          moved = true;
        }
        this.grid[r][c] = col[r];
      }
    }
    if (moved) {
      this.addRandomTile();
      this.saveStateToLocalStorage();
    }
  }

  saveStateToLocalStorage() {
    const state = {
      grid: this.grid.map(row => row.map(tile => tile ? tile.value : null)),
      score: this.score,
    };
    localStorage.setItem('2048-game', JSON.stringify(state));
  }

  loadStateFromLocalStorage() {
    const state = JSON.parse(localStorage.getItem('2048-game'));
    if (state) {
      this.grid = state.grid.map(row => row.map(value => value ? new Tile(value) : null));
      this.score = state.score;
    } else {
      this.init();
    }
  }
}

const playSound = (type) => {
  const sounds = {
    move: 'move.mp3',
    merge: 'merge.mp3',
  };
  const audio = new Audio(sounds[type]);
  audio.play().catch((error) => {
    console.error('Ошибка воспроизведения звука:', error);
  });
};

const sendScoreToServer = async (score) => {
  try {
    const response = await fetch('http://fe.it-academy.by/TestForm.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `score=${score}`,
    });
    if (response.ok) {
      console.log('Score sent successfully!');
    } else {
      console.error('Failed to send score.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const game = new Game();
const boardEl = document.getElementById('board');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');
const rulesHeader = document.getElementById('rulesHeader');
const rulesContent = document.getElementById('rulesContent');

function render() {
  boardEl.innerHTML = '';
  for (let r = 0; r < game.size; r++) {
    for (let c = 0; c < game.size; c++) {
      const tile = game.grid[r][c];
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      if (tile) {
        cellEl.textContent = tile.value;
        cellEl.classList.add(`tile-${tile.value <= 2048 ? tile.value : 'super'}`, 'tile-burst');
      }
      boardEl.appendChild(cellEl);
    }
  }
  scoreEl.textContent = game.score;
}

window.addEventListener('load', () => {
  game.loadStateFromLocalStorage();
  render();
});

window.addEventListener('beforeunload', (e) => {
  if (game.grid.some(row => row.some(cell => cell))) {
    e.preventDefault();
    e.returnValue = '';
    sendScoreToServer(game.score);
  }
});

restartBtn.addEventListener('click', () => {
  game.init();
  render();
});

rulesHeader.addEventListener('click', () => {
  const isHidden = rulesContent.style.display === 'none';
  rulesContent.style.display = isHidden ? 'block' : 'none';
  rulesHeader.textContent = isHidden ? 'Правила ▲' : 'Правила ▼';
});

let touchStartX = 0, touchStartY = 0, touchEndX = 0, touchEndY = 0;

document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}, { passive: false });

document.addEventListener('touchmove', (e) => {
  e.preventDefault(); 
}, { passive: false });

document.addEventListener('touchend', (e) => {
  const touch = e.changedTouches[0];
  touchEndX = touch.clientX;
  touchEndY = touch.clientY;

  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 50) game.moveRight();
    if (deltaX < -50) game.moveLeft();
  } else {
    if (deltaY > 50) game.moveDown();
    if (deltaY < -50) game.moveUp();
  }
  render();
}, { passive: false });

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
  }
  render();
});
