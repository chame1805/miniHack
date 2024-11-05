import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperComponentComponent } from './minesweeper-component.component';

describe('MinesweeperComponentComponent', () => {
  let component: MinesweeperComponentComponent;
  let fixture: ComponentFixture<MinesweeperComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MinesweeperComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinesweeperComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
