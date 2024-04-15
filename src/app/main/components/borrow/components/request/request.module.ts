import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowRequestComponent } from './components/borrow-request/borrow-request.component';
import { BorrowReserveComponent } from './components/borrow-reserve/borrow-reserve.component';
import { RequestRoutingModule } from './request-routing.module';



@NgModule({
  declarations: [
    BorrowRequestComponent,
    BorrowReserveComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule
  ]
})
export class RequestModule { }
