import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';
import { EditPopupComponent } from './components/edit-popup/edit-popup.component';
import { TableComponent } from './components/table/table.component';
import { ListRoutingModule } from './list-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';
import { PushPopupComponent } from './components/push-popup/push-popup.component';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from '../../../../../modules/material/material.module';




@NgModule({
  declarations: [
    DeletePopupComponent,
    EditPopupComponent,
    TableComponent,
    PushPopupComponent,
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    MatDialogModule,
    MatPaginator,
    FormsModule,
    MaterialModule
  ]
})
export class ListModule { }
