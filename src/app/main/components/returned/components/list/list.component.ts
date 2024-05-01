import { Component } from '@angular/core';
import { EditComponent } from '../edit/edit.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  constructor(private dialog : MatDialog) {}

  openEdit() {
    this.dialog.open(EditComponent, {
      width: '4000px',
      height: '800px',
    })
  };
  
}
