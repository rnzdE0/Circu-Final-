import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BorrowRequestComponent } from './components/borrow-request/borrow-request.component';
import { BorrowReserveComponent } from './components/borrow-reserve/borrow-reserve.component';
import { TableComponent } from '../list/components/table/table.component';

const routes: Routes = [
  { path: '', redirectTo: 'BorrowRequest', pathMatch: 'full' },
  { path: 'BorrowRequest', component: BorrowRequestComponent},
  { path: 'BorrowReserve', component: BorrowReserveComponent},

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
