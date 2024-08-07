import { Component, Inject } from '@angular/core';
import Swal from 'sweetalert2'
import { MainService } from '../../../../../../../services/main.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.scss'
})
export class DeletePopupComponent {
  getData: any;

  constructor (
    private ref: MatDialogRef <DeletePopupComponent>,
    private ds: MainService,
    @Inject(MAT_DIALOG_DATA)
    public material: any 
  ) { 
    console.log(this.material)
  }


  //  submit(id: number){
  //   Swal.fire({
  //     width: 300,
  //     title: "Deleted!",
  //     icon: "success",
  //     confirmButtonColor: '#31A463',
  //     iconColor: 'red',
  //     customClass: {
  //       popup: 'my-swal-popup',
  //       icon: 'my-swal-icon',
  //       confirmButton: 'my-swal-confirm-button'
  //     }
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.ds.delete('delete-borrowlist/' + this.material.id).subscribe({
  //         next: () => {
  //           Swal.fire({
  //             title: "Archiving complete!",
  //             text: "Journal has been successfully archived.",
  //             icon: "success",
  //             confirmButtonText: 'Close',
  //             confirmButtonColor: "#777777",
  //             scrollbarPadding: false,
  //           })
  //         },
  //         error: (err: any) => {
  //           console.log(err)
  //           Swal.fire({
  //             title: "Archive Error!",
  //             text: "Please try again later.",
  //             icon: "error",
  //             confirmButtonText: 'Close',
  //             confirmButtonColor: "#777777",
  //             scrollbarPadding: false,
  //           });
  //         }
  //       })
  //     }
  //   });
  // }
  

  submit(){
        this.ds.delete('circulation/delete-borrowlist/' + this.material.id).subscribe({
          next: () => {
            this.ref.close('Changed Data');
            Swal.fire({
              title: "Archiving complete!",
              text: "Journal has been successfully archived.",
              icon: "success",
              iconColor: '#4F6F52',
              confirmButtonText: 'Close',
              confirmButtonColor: "#777777",
              scrollbarPadding: false,
            })
          },
          error: (err: any) => {
            console.log(err)
            Swal.fire({
              title: "Delete Error!",
              text: "Please try again later.",
              icon: "error",
              confirmButtonText: 'Close',
              confirmButtonColor: "#777777",
              scrollbarPadding: false,
            });
          }
        })
      }
    
    }


