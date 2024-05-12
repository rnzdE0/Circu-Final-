import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReservationFormComponent } from './reservation-form.component';
import { ResformComponent } from './components/resform/resform.component';
import { QueueComponent } from './components/queue/queue.component';
import { AddComponent } from './components/add/add.component';

const routes: Routes = [
  { path: '', redirectTo: 'Resform', pathMatch: 'full' },
  { path: 'Resform', component: ResformComponent},
  { path: 'que', component: QueueComponent},
  { path: 'add', component: AddComponent},
  

  // { path: 'reservationF', 
  //   component: ReservationFormComponent,
  //   children: [{
  //     path: '',
  //     loadChildren: ()=>import('./reservation-form.module').then((m)=>m.ReservationFormModule)
  //   }]
  // },

]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationFormRoutingModule { }
