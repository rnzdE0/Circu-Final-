import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// parent
import { BorrowComponent } from './components/borrow/borrow.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ReturnedComponent } from './components/returned/returned.component';
import { UserComponent } from './components/user/user.component';

// child
import { BorrowRequestComponent } from './components/borrow/components/request/components/borrow-request/borrow-request.component';
import { TableComponent } from './components/borrow/components/list/components/table/table.component';
import { ReserveComponent } from './components/borrow/components/reservation/components/reserve/reserve.component';
import { TopComponent } from './components/reports/components/top/top.component';
import { MostComponent } from './components/reports/components/most/most.component';
import { ReservationComponent } from './components/borrow/components/reservation/reservation.component';
import { ReservationFormComponent } from './components/borrow/components/reservation-form/reservation-form.component';
import { ResformComponent } from './components/borrow/components/reservation-form/components/resform/resform.component';
import { LogsComponent } from './components/logs/logs.component';
import { LoadingComponent } from './components/loading/loading.component';

const routes: Routes = [

  // child
  { path: '', redirectTo: 'request', pathMatch: 'full' },
  { path: 'request', component: BorrowRequestComponent},
  { path: 'form', component: ResformComponent},
  { path: 'list', component: TableComponent},
  { path: 'reserve', component: ReserveComponent},
  { path: 'top', component: TopComponent},
  { path: 'most', component: MostComponent},
  { path: 'log', component: LogsComponent},
  { path: 'loading', component: LoadingComponent},

  // parent
  { 
    path: 'borrow', 
    component: BorrowComponent,
    children: [{
      path: '',
      loadChildren: ()=>import('./components/borrow/borrow.module').then((m)=>m.BorrowModule)
    }]
  },
  { 
    path: 'reservation', 
    component: ReservationComponent,
    children: [{
      path: '',
      loadChildren: ()=>import('./components/borrow/components/reservation/reservation.module').then((m)=>m. ReservationModule)
    }]
  },
  { 
    path: 'reports', 
    component: ReportsComponent,
    children: [{
      path: '',
      loadChildren: ()=>import('./components/reports/reports.module').then((m)=>m.ReportsModule)
    }]
  },
  { 
    path: 'returned', 
    component: ReturnedComponent,
    children: [{
      path: '',
      loadChildren: ()=>import('./components/returned/returned.module').then((m)=>m.ReturnedModule)
    }]
  },
  { 
    path: 'user', 
    component: UserComponent,
    children: [{
      path: '',
      loadChildren: ()=>import('./components/user/user.module').then((m)=>m.UserModule)
    }]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
