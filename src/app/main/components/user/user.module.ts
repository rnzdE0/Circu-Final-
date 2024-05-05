import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserPopupComponent } from './components/user-popup/user-popup.component';
import { UserRoutingModule } from './user-routing.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    UserTableComponent,
    UserPopupComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatDialogModule
  ]
})
export class UserModule { }
