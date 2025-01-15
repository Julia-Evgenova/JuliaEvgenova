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
      const row = this.grid[r].filter(tile => tile !== null); //получаем все непустые плитки
      for (let c = 0; c < row.length - 1; c++) {
        if (row[c] && row[c + 1] && row[c].value === row[c + 1].value) {
          row[c].value *= 2; 
          this.score += row[c].value;
          row.splice(c + 1, 1); //убираем вторую плитку
        }
      }
      while (row.length < this.size) {
        row.push(null); //заполняем оставшееся место пустыми клетками
      }
      if (!this.grid[r].every((tile, i) => tile === row[i])) {
        moved = true;
      }
      this.grid[r] = row; //обновляем строку
    }
    if (moved) this.addRandomTile(); //добавляем новую плитку (если было движение)
  }
  

  moveRight() {
    let moved = false;
    for (let r = 0; r < this.size; r++) {
      const row = this.grid[r].filter(tile => tile !== null); //собираем непустые плитки
      for (let c = row.length - 1; c > 0; c--) {
        if (row[c] && row[c - 1] && row[c].value === row[c - 1].value) {
          row[c].value *= 2; //суммируем плитки
          this.score += row[c].value;
          row.splice(c - 1, 1); //убираем предыдущую плитку
        }
      }
      while (row.length < this.size) {
        row.unshift(null); //ополняем пустыми клетками слева
      }
      if (!this.grid[r].every((tile, i) => tile === row[i])) {
        moved = true;
      }
      this.grid[r] = row; //обновляем строку
    }
    if (moved) this.addRandomTile(); //добавляем новую плитку, если было движение
  }
  

  moveUp() {
    let moved = false;
    for (let c = 0; c < this.size; c++) {
      const col = [];
      for (let r = 0; r < this.size; r++) {
        if (this.grid[r][c] !== null) {
          col.push(this.grid[r][c]); //собираем непустые плитки
        }
      }
      for (let i = 0; i < col.length - 1; i++) {
        if (col[i] && col[i + 1] && col[i].value === col[i + 1].value) {
          col[i].value *= 2; //суммируем плитки
          this.score += col[i].value;
          col.splice(i + 1, 1); //убираем нижнюю плитку
        }
      }
      while (col.length < this.size) {
        col.push(null); //дополняем пустыми клетками снизу
      }
      for (let r = 0; r < this.size; r++) {
        if (this.grid[r][c] !== col[r]) {
          moved = true;
        }
        this.grid[r][c] = col[r]; //обновляем колонку
      }
    }
    if (moved) this.addRandomTile(); //добавляем новую плитку, если было движение
  }
  

  moveDown() {
    let moved = false;
    for (let c = 0; c < this.size; c++) {
      const col = [];
      for (let r = 0; r < this.size; r++) {
        if (this.grid[r][c] !== null) {
          col.push(this.grid[r][c]); //собираем непустые плитки
        }
      }
      for (let i = col.length - 1; i > 0; i--) {
        if (col[i] && col[i - 1] && col[i].value === col[i - 1].value) {
          col[i].value *= 2; // Суммируем плитки
          this.score += col[i].value;
          col.splice(i - 1, 1); //убираем верхнюю плитку
        }
      }
      while (col.length < this.size) {
        col.unshift(null); //дополняем пустыми клетками сверху
      }
      for (let r = 0; r < this.size; r++) {
        if (this.grid[r][c] !== col[r]) {
          moved = true;
        }
        this.grid[r][c] = col[r]; //обновляем колонку
      }
    }
    if (moved) this.addRandomTile(); //добавляем новую плитку, если было движение
  }
  
}

const boardEl = document.getElementById('board');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');
const rulesHeader = document.getElementById('rulesHeader');
const rulesContent = document.getElementById('rulesContent');

const game = new Game();

function render() {
  boardEl.innerHTML = '';
  for (let r = 0; r < game.size; r++) {
    for (let c = 0; c < game.size; c++) {
      const tile = game.grid[r][c];
      const cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      if (tile) {
        cellEl.textContent = tile.value;
        cellEl.classList.add(`tile-${tile.value <= 2048 ? tile.value : 'super'}`);
      }
      boardEl.appendChild(cellEl);
    }
  }
  scoreEl.textContent = game.score;
}

function handleKey(e) {
  let moved = false;
  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      game.moveLeft();
      moved = true;
      break;
    case 'ArrowRight':
      e.preventDefault();
      game.moveRight();
      moved = true;
      break;
    case 'ArrowUp':
      e.preventDefault();
      game.moveUp();
      moved = true;
      break;
    case 'ArrowDown':
      e.preventDefault();
      game.moveDown();
      moved = true;
      break;
    default:
      return; //игнор. остальные клавиши
  }

  if (moved) {
    render();
  }
}


rulesHeader.addEventListener('click', () => {
  const isHidden = rulesContent.style.display === 'none';
  rulesContent.style.display = isHidden ? 'block' : 'none';
  rulesHeader.textContent = isHidden ? 'Правила ▲' : 'Правила ▼';
});

restartBtn.addEventListener('click', () => {
  game.init();
  render();
});

document.addEventListener('DOMContentLoaded', () => {
  game.init();
  render();
});

//обработчики клавиш
function handleKey(e) {
  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      game.moveLeft();
      break;
    case 'ArrowRight':
      e.preventDefault();
      game.moveRight();
      break;
    case 'ArrowUp':
      e.preventDefault();
      game.moveUp();
      break;
    case 'ArrowDown':
      e.preventDefault();
      game.moveDown();
      break;
    default:
      return;
  }
  render();
}

//обработчики жестов
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

function handleTouchStart(e) {
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}

function handleTouchEnd(e) {
  const touch = e.changedTouches[0];
  touchEndX = touch.clientX;
  touchEndY = touch.clientY;
  handleSwipe();
}

function handleSwipe() {
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 50) {
      game.moveRight();
    } else if (deltaX < -50) {
      game.moveLeft();
    }
  } else {
    if (deltaY > 50) {
      game.moveDown();
    } else if (deltaY < -50) {
      game.moveUp();
    }
  }
  render();
}

//подключение событий
document.addEventListener('keydown', handleKey);
document.addEventListener('touchstart', handleTouchStart, { passive: true });
document.addEventListener('touchend', handleTouchEnd, { passive: true });

//инициализация игры
game.init();
render();


window.addEventListener('keydown', handleKey);
