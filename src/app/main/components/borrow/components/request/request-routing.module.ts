import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BorrowRequestComponent } from './components/borrow-request/borrow-request.component';
import { BorrowReserveComponent } from './components/borrow-reserve/borrow-reserve.component';
import { RequestComponent } from './request.component';

const routes: Routes = [
  { path: '', redirectTo: 'BorrowRequest', pathMatch: 'full' },
  { path: 'BorrowRequest', component: BorrowRequestComponent},
  { path: 'BorrowReserve', component: BorrowReserveComponent},
  { path: 'request', component: RequestComponent},


  // parent

  // { path: 'request', 
  //   component: RequestComponent,
  //   children: [{
  //     path: '',
  //     loadChildren: ()=>import('./request.module').then((m)=>m.RequestModule)
  //   }]
  // },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
