import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationPopupComponent } from './components/reservation-popup/reservation-popup.component';
import { ReserveComponent } from './components/reserve/reserve.component';
import { ReservationRoutingModule } from './reservation-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteComponent } from './components/delete/delete.component';



@NgModule({
  declarations: [
    ReservationPopupComponent,
    ReserveComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    MatDialogModule
  ]
})
export class ReservationModule { }
