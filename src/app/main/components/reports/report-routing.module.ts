import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GraphComponent } from './components/graph/graph.component';
import { MostComponent } from './components/most/most.component';
import { TopComponent } from './components/top/top.component';

const routes: Routes = [
  { path: '', redirectTo: 'graph', pathMatch: 'full' },
  { path: 'graph', component: GraphComponent},
  { path: 'most', component: MostComponent},
  { path: 'top', component: TopComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
