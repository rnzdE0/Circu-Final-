import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserPopupComponent } from './components/user-popup/user-popup.component';
import { UserRoutingModule } from './user-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { MaterialModule } from '../../../modules/material/material.module';
import { MainModule } from "../../main.module";
import { LoadingComponent } from '../loading/loading.component';
import { LoadingsComponent } from '../loadings/loadings.component';




@NgModule({
  declarations: [
    UserTableComponent,
    UserPopupComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatDialogModule,
    MatPaginator,
    FormsModule,
    MatTable,
    MaterialModule,
    LoadingsComponent
]
})
export class UserModule { }
