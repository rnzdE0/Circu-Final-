import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainService } from '../../../../../../../services/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.scss'
})
export class DeleteComponent {
  constructor (
    private ds: MainService,
    @Inject(MAT_DIALOG_DATA)
    public material: any ,
    private ref: MatDialogRef <DeleteComponent>,
  ) {
    // console.log('Data received in dialog:', this.material);
   }
   
   submit(id: number){
    this.ds.put('circulation/cancel/' + id, {}).subscribe({
      next: () => {
        this.ref.close('Changed Data')
        Swal.fire({
          title: "Cancelation complete!",
          text: "Succesfully cancelled.",
          icon: "success",
          iconColor: '#4F6F52',
          confirmButtonColor: '#4F6F52',
          confirmButtonText: 'Close',
          // confirmButtonColor: "#777777",
          scrollbarPadding: false,
        })
      },
      error: (err: any) => {
        // console.log(err)
        Swal.fire({
          title: "Cancelation Error!",
          text: "Please try again later.",
          icon: "error",
          confirmButtonText: 'Close',
          confirmButtonColor: "#4F6F52",
          scrollbarPadding: false,
        });
      }
    })
  }

}
