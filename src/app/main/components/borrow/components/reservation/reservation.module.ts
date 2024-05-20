import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationPopupComponent } from './components/reservation-popup/reservation-popup.component';
import { ReserveComponent } from './components/reserve/reserve.component';
import { ReservationRoutingModule } from './reservation-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteComponent } from './components/delete/delete.component';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PushComponent } from './components/push/push.component';



@NgModule({
  declarations: [
    ReservationPopupComponent,
    ReserveComponent,
    DeleteComponent,
    PushComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    MatDialogModule,
    MatPaginator,
    FormsModule,
  ]
})
export class ReservationModule { }
