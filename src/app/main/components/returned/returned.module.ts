import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';
import { ReturnedRoutingModule } from './returned-routing.module';
import { EditComponent } from './components/edit/edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../modules/material/material.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';



@NgModule({
  declarations: [
    ListComponent,
    DeletePopupComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ReturnedRoutingModule,
    MatDialogModule,
    MatPaginator,
    FormsModule,
    MatSortModule,
    MatTable,
    MaterialModule
  ]
})
export class ReturnedModule { }
