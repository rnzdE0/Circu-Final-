import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { EditPopupComponent } from './components/edit-popup/edit-popup.component';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';
import { ListComponent } from './list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'table', component: TableComponent},
  { path: 'edit', component: EditPopupComponent},
  { path: 'delete', component: DeletePopupComponent},
  
  // parent

  { path: 'list', 
    component: ListComponent,
    children: [{
      path: '',
      loadChildren: ()=>import('./list.module').then((m)=>m.ListModule)
    }]
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
