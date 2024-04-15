import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BorrowRequestComponent } from './components/borrow-request/borrow-request.component';
import { BorrowReserveComponent } from './components/borrow-reserve/borrow-reserve.component';

const routes: Routes = [
  { path: '', redirectTo: 'request', pathMatch: 'full' },
  { path: 'request', component: BorrowRequestComponent},
  { path: 'reserve', component: BorrowReserveComponent},

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
