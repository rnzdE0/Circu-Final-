import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestComponent } from './components/request/request.component';
import { ListComponent } from './components/list/list.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { BorrowRoutingModule } from './borrow-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    RequestComponent,
    ListComponent,
    ReservationComponent
  ],
  imports: [
    CommonModule,
    BorrowRoutingModule,
    RouterModule
  ]
})
export class BorrowModule { }
