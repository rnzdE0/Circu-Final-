import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { EditPopupComponent } from './components/edit-popup/edit-popup.component';
import { DeletePopupComponent } from './components/delete-popup/delete-popup.component';
import { ReturnedRoutingModule } from './returned-routing.module';



@NgModule({
  declarations: [
    ListComponent,
    EditPopupComponent,
    DeletePopupComponent
  ],
  imports: [
    CommonModule,
    ReturnedRoutingModule
  ]
})
export class ReturnedModule { }
