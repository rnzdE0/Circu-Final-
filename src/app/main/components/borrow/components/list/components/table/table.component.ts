import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { PushPopupComponent } from '../push-popup/push-popup.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  constructor(private dialog : MatDialog) {}

  openDialog() {
    this.dialog.open(EditPopupComponent, {
      width: '70%',
      height: '800px',
    })
  };

  deleteDialog() {
    this.dialog.open(DeletePopupComponent, {
      width: '400px',
      height: '250px',
    })
  };

  pushDialog() {
    this.dialog.open(PushPopupComponent, {
      width: '400px',
      height: '250px',
    })
  };
}
