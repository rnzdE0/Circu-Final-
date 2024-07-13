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
import { MaterialModule } from '../../../../../modules/material/material.module';
import { MatSortModule } from '@angular/material/sort';
import { LoadingsComponent } from '../../../loadings/loadings.component';



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
    ReactiveFormsModule,
    MaterialModule,
    MatSortModule,
    LoadingsComponent
  ]
})
export class ReservationModule { }
