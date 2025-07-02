import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserPopupComponent } from './components/user-popup/user-popup.component';
import { UserCardComponent } from './components/user-card/user-card.component';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', component: UserTableComponent},
  { path: 'popup', component: UserPopupComponent},
  { path: 'user', component: UserCardComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
