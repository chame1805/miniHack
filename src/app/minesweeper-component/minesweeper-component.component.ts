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

  ngOnInit() {
  this.initializeGrid();
  this.placeMines();
  this.calculateAdjacentMines();
  }

  startGame(size: { rows: number; cols: number; mines: number }) {
    this.gridSize.rows = size.rows;
    this.gridSize.cols = size.cols;
    this.numMines = size.mines;

    this.initializeGrid();
    this.placeMines();
    this.calculateAdjacentMines();
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
    if (cell.hasMine) {
      alert('¡Game Over! Encontraste una mina.');
      this.revealAllMines();
    } else {
      cell.revealed = true;
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
