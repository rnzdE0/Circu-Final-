import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowComponent } from './components//borrow/borrow.component';
import { ReturnedComponent } from './components//returned/returned.component';
import { ReportsComponent } from './components/reports/reports.component';
import { UserComponent } from './components/user/user.component';
import { MainRoutingModule } from './main-routing.module';



@NgModule({
  declarations: [
    BorrowComponent,
    ReturnedComponent,
    ReportsComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
