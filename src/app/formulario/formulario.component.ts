import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  rows: number = 0;
  cols: number = 0;
  mines: number = 0;

  @Output() startGame = new EventEmitter<{ rows: number; cols: number; mines: number }>();

  onSubmit() {
    this.startGame.emit({ rows: this.rows, cols: this.cols, mines: this.mines });
  }
}
