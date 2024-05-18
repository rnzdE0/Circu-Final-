import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationPopupComponent } from '../reservation-popup/reservation-popup.component';
import { DeleteComponent } from '../delete/delete.component';
import { AuthService } from '../../../../../../../services/auth.service';
import { ReservationList } from './reserve-list.model';

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

  onDepartmentChange(): void {
    this.selectedProgram = '';
  }
  constructor(private dialog : MatDialog,
    private authService: AuthService
  ) {}

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
