import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  constructor(private dialog : MatDialog) {}

  openDialog() {
    this.dialog.open(EditPopupComponent, {
      width: '400px',
    })
  };
}
