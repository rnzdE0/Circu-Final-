import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';
import { EditComponent } from './components/edit/edit.component';
import { ReturnedComponent } from './returned.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListComponent},
  { path: 'edit', component: EditComponent},
  { path: 'delete', component: DeletePopupComponent},
  { path: 'returned', component: ReturnedComponent},
  


  // parent


]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnedRoutingModule { }
