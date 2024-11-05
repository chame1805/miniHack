import { Component, OnInit } from '@angular/core';
import { Cell } from '../cell';

@Component({
  selector: 'app-minesweeper-component',
  templateUrl: './minesweeper-component.component.html',
  styleUrls: ['./minesweeper-component.component.css']
})
export class Mina implements OnInit {
  gridSize: { rows: number; cols: number } = { rows: 0, cols: 0 };
  numMines = 0;
  grid: Cell[][] = [];
  gameState: 'inProgress' | 'lost' | 'won' = 'inProgress'; 

  ngOnInit() {}

  startGame(size: { rows: number; cols: number; mines: number }) {
    this.gridSize = { rows: size.rows, cols: size.cols };
    this.numMines = size.mines;
    this.gameState = 'inProgress'; 

    this.initializeGrid();
    this.placeMines();
    this.calculateAdjacentMines();
  }


  restartGame() {
    this.grid = []; 
    this.gameState = 'inProgress'; 
  }

  initializeGrid() {
    this.grid = [];
    for (let i = 0; i < this.gridSize.rows; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < this.gridSize.cols; j++) {
        row.push({ hasMine: false, adjacentMines: 0, revealed: false });
      }
      this.grid.push(row);
    }
  }

  placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < this.numMines) {
      const x = Math.floor(Math.random() * this.gridSize.rows);
      const y = Math.floor(Math.random() * this.gridSize.cols);
      if (!this.grid[x][y].hasMine) {
        this.grid[x][y].hasMine = true;
        minesPlaced++;
      }
    }
  }

  calculateAdjacentMines() {
    for (let x = 0; x < this.gridSize.rows; x++) {
      for (let y = 0; y < this.gridSize.cols; y++) {
        if (this.grid[x][y].hasMine) continue;

        let count = 0;
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (
              nx >= 0 &&
              nx < this.gridSize.rows &&
              ny >= 0 &&
              ny < this.gridSize.cols &&
              this.grid[nx][ny].hasMine
            ) {
              count++;
            }
          }
        }
        this.grid[x][y].adjacentMines = count;
      }
    }
  }

  revealCell(x: number, y: number) {
    const cell = this.grid[x][y];
    if (cell.revealed || this.gameState !== 'inProgress') return; 
    cell.revealed = true; 

    if (cell.hasMine) {
      this.gameState = 'lost'; 
      alert('¡Game Over! Encontraste una mina.');
      this.revealAllMines(); 
    } else if (cell.adjacentMines === 0) {
      this.revealAdjacentCells(x, y); 
    }

   
    if (this.checkWin()) {
      this.gameState = 'won';
      alert('¡Ganaste! Has revelado todas las celdas sin minas.');
    }
  }

  checkWin(): boolean {
  
    return this.grid.every(row => row.every(cell => cell.revealed || cell.hasMine));
  }

  revealAdjacentCells(x: number, y: number) {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < this.gridSize.rows && ny >= 0 && ny < this.gridSize.cols) {
          this.revealCell(nx, ny); 
        }
      }
    }
  }

  revealAllMines() {
    for (let x = 0; x < this.gridSize.rows; x++) {
      for (let y = 0; y < this.gridSize.cols; y++) {
        if (this.grid[x][y].hasMine) {
          this.grid[x][y].revealed = true;
        }
      }
    }
  }
}
