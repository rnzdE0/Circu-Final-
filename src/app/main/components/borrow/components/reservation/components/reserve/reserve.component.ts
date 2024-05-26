import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationPopupComponent } from '../reservation-popup/reservation-popup.component';
import { DeleteComponent } from '../delete/delete.component';
import { AuthService } from '../../../../../../../services/auth.service';
import { OnlineList, ReservationList } from './reserve-list.model';
import { PushComponent } from '../push/push.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.scss'
})
export class ReserveComponent {
  selectedDepartment: string = '';
  selectedProgram: string = '';
  selectedPatronType: string = '';
  selectedAllType: string = '';
  departments: string[] = ['CBA', 'CEAS', 'CCS', 'CHTM', 'CAHS'];
  secondFilterOptions: { [key: string]: string[] } = {
    CBA: ['BSA', 'BSCA', 'BSBA-FM', 'BSBA-HRM', 'BSBA-MKT'],
    CEAS: ['BEEd', 'BECEd', 'BSEd-E', 'BSEd-FIL', 'BSEd-M', 'BSEd-SCI', 'BSEd-SOC', 'BPEd', 'BCAEd', 'BACOM', 'TCP'],
    CCS: ['BSIT', 'BSCS', 'EMC', 'ACT'],
    CHTM: ['BSHM', 'BSTM'],
    CAHS: ['BSN', 'BSM', 'GM']
  };

  reservationList: any[] = [];
  elements: any;
  material: any;
  onlineList: any;


  ngOnInit():void{
    this.fetchReserveList();
  }

  fetchReserveList(): void {
    this.authService.getReserveList().subscribe(
      (data: any) => {
        console.log('Received data from reservationlist:', data);
        console.log('Type of data:', typeof data);
        this.reservationList = data as ReservationList[];
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  fetchOnlineList(): void {
    this.authService.getOnlineList().subscribe(
      (data: any) => {
        console.log('Received data from reservationlist:', data);
        console.log('Type of data:', typeof data);
        this.onlineList = data as OnlineList[];
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onDepartmentChange(): void {
    this.selectedProgram = '';
  }
  constructor(private dialog : MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  redirectToListPage() {
    this.router.navigate(['main/borrow/reservation/reserve']); 
  }

  // push() {
  //   this.dialog.open(PushComponent, {
  //     width: '55%',
  //     height: '760px',
  //   })
  // }

  push(data: any) {
    this.Openpopup(data, 'push', PushComponent);
  }

  Openpopup(id: number, title: any, component:any) {
    var _popup = this.dialog.open(component, {
      width: '400px',
      height: '250px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: id
    });
    _popup.afterClosed().subscribe(result => {
      this.redirectToListPage();
      if(result === 'Changed Data') {
        this.fetchReserveList()
      }
    });
  }
  getData() {
    throw new Error('Method not implemented.');
  }


  openDialog() {
    this.dialog.open(ReservationPopupComponent, {
      width: '55%',
      height: '760px',
    })
  };

  deleteDialog() {
    this.dialog.open(DeleteComponent, {
      width: '400px',
      height: '250px',
    })
  };
}

// for testing book availability

// export class ReservationListComponent implements OnInit {
//   reservationList: Reservation[] = [];

//   constructor(private reservationService: ReservationService) { }

//   ngOnInit(): void {
//     this.getReservations();
//   }

//   getReservations(): void {
//     this.reservationService.getReservations()
//       .subscribe(
//         (reservations: Reservation[]) => {
//           this.reservationList = reservations;
//         },
//         (error) => {
//           console.error('Error fetching reservations', error);
//         }
//       );
//   }
// }
