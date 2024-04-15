import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationPopupComponent } from './components/reservation-popup/reservation-popup.component';
import { ReserveComponent } from './components/reserve/reserve.component';
import { ReservationRoutingModule } from './reservation-routing.module';



@NgModule({
  declarations: [
    ReservationPopupComponent,
    ReserveComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule
  ]
})
export class ReservationModule { }
