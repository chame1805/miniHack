import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  mines: number = 0; 

  @Output() startGame = new EventEmitter<{ rows: number; cols: number; mines: number }>();

  onSubmit() {
    
    const gridSize = this.mines;
    this.startGame.emit({ rows: gridSize, cols: gridSize, mines: this.mines });
  }
}
