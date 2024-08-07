import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostComponent } from './components/most/most.component';
import { TopComponent } from './components/top/top.component';
import { GraphComponent } from './components/graph/graph.component';
import { ReportRoutingModule } from './report-routing.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { LoadingsComponent } from '../loadings/loadings.component';
import { MaterialModule } from '../../../modules/material/material.module';




@NgModule({
  declarations: [
    MostComponent,
    TopComponent,
    

  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    MatPaginator,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    HttpClientModule,
    LoadingsComponent,
    MaterialModule,
    LoadingsComponent
    
  ]
})
export class ReportsModule { }
