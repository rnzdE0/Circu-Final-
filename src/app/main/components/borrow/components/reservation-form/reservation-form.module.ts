import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './components/add/add.component';
import { QueueComponent } from './components/queue/queue.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReservationFormComponent } from './reservation-form.component';
import { ResformComponent } from './components/resform/resform.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddComponent,
    QueueComponent,
    ResformComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class ReservationFormModule { }
