import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';
import { ReturnedRoutingModule } from './returned-routing.module';
import { EditComponent } from './components/edit/edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';



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
    FormsModule
  ]
})
export class ReturnedModule { }
