import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostComponent } from './components/most/most.component';
import { TopComponent } from './components/top/top.component';
import { GraphComponent } from './components/graph/graph.component';
import { ReportRoutingModule } from './report-routing.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';





@NgModule({
  declarations: [
    MostComponent,
    TopComponent,
    GraphComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    MatPaginator,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatToolbarModule
    
  ]
})
export class ReportsModule { }
