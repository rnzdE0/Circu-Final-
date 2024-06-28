import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MainService } from '../../../../../../../services/main.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss'
})
export class PoliciesComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: any,
    private http: HttpClient,
    private ds: MainService,
    private ref: MatDialogRef <PoliciesComponent>,
    ) {
      
    }

  }

