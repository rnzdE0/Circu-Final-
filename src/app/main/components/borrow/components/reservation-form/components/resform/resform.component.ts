import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { QueueComponent } from '../queue/queue.component';

@Component({
  selector: 'app-resform',
  templateUrl: './resform.component.html',
  styleUrl: './resform.component.scss'
})
export class ResformComponent {
  constructor(private dialog : MatDialog) {}

  addDialog() {
    this.dialog.open(AddComponent, {
      width: '400px',
      height: '250px',
    })
  };

  queDialog() {
    this.dialog.open(QueueComponent, {
      width: '400px',
      height: '250px',
    })
  };
}
