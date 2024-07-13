import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BorrowRequestComponent } from './components/borrow-request/borrow-request.component';
import { RequestComponent } from './request.component';

const routes: Routes = [
  { path: '', redirectTo: 'BorrowRequest', pathMatch: 'full' },
  { path: 'BorrowRequest', component: BorrowRequestComponent},
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
