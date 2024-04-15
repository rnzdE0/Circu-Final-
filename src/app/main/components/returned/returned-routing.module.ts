import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { EditPopupComponent } from './components/edit-popup/edit-popup.component';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListComponent},
  { path: 'edit', component: EditPopupComponent},
  { path: 'delete', component: DeletePopupComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnedRoutingModule { }
