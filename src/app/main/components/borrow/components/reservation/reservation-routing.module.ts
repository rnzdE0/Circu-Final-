import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReserveComponent } from './components/reserve/reserve.component';
import { ReservationPopupComponent } from './components/reservation-popup/reservation-popup.component';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './reservation.component';
import { PushComponent } from './components/push/push.component';

const routes: Routes = [
  { path: '', redirectTo: 'reserve', pathMatch: 'full' },
  { path: 'reservation', component: ReservationComponent},
  { path: 'reserve', component: ReserveComponent},
  { path: 'popup', component: ReservationPopupComponent},
  { path: 'push', component: PushComponent}

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
