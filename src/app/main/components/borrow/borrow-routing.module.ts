import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { RequestComponent } from './components/request/request.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { BorrowComponent } from './borrow.component';

const routes: Routes = [
  { path: '', redirectTo: 'request', pathMatch: 'full' },


  { path: 'borrow', 
    component: BorrowComponent,
    children: [{
      path: '',
      loadChildren: ()=>import('./borrow.module').then((m)=>m.BorrowModule)
    }]
  },


  { path: 'list', 
    component: ListComponent,
    children: [{
      path: '',
      loadChildren: ()=>import('./components/list/list.module').then((m)=>m.ListModule)
    }]
  },
  { path: 'request', 
    component: RequestComponent,
    children: [{
      path: '',
      loadChildren: ()=>import('./components/request/request.module').then((m)=>m.RequestModule)
    }]
  },
  { path: 'reservation', 
    component: ReservationComponent,
    children: [{
      path: '',
      loadChildren: ()=>import('./components/reservation/reservation.module').then((m)=>m.ReservationModule)
    }]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BorrowRoutingModule { }
