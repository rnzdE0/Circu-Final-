import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestComponent } from './components/request/request.component';
import { ListComponent } from './components/list/list.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { BorrowRoutingModule } from './borrow-routing.module';
import { RouterModule } from '@angular/router';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { MaterialModule } from '../../../modules/material/material.module';

@NgModule({
  declarations: [
    RequestComponent,
    ListComponent,
    ReservationComponent,
    ReservationFormComponent,
  ],
  imports: [
    CommonModule,
    BorrowRoutingModule,
    RouterModule,
    MaterialModule
  ]
})
export class BorrowModule { }
