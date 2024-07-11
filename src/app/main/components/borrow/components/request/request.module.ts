import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowRequestComponent } from './components/borrow-request/borrow-request.component';
import { BorrowReserveComponent } from './components/borrow-reserve/borrow-reserve.component';
import { RequestRoutingModule } from './request-routing.module';
import { ListModule } from '../list/list.module';
import { TableComponent } from '../list/components/table/table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoliciesComponent } from './components/policies/policies.component';
import { MaterialModule } from '../../../../../modules/material/material.module';



@NgModule({
  declarations: [
    BorrowRequestComponent,
    BorrowReserveComponent,
    PoliciesComponent,
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ]
})
export class RequestModule { }
