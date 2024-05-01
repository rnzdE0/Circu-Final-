import { Component } from '@angular/core';
import { EditComponent } from '../edit/edit.component';
import { MatDialog } from '@angular/material/dialog';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  constructor(private dialog : MatDialog) {}

  openEdit() {
    this.dialog.open(EditComponent, {
      width: '70%',
      height: '800px',
    })
  };

  deletePop() {
    this.dialog.open(DeletePopupComponent, {
      width: '400px',
      height: '250px',
    })
  };
  
}
