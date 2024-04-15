import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { EditPopupComponent } from './components/edit-popup/edit-popup.component';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';

const routes: Routes = [
  { path: '', redirectTo: 'table', pathMatch: 'full' },
  { path: 'table', component: TableComponent},
  { path: 'edit', component: EditPopupComponent},
  { path: 'delete', component: DeletePopupComponent}

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
