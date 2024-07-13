import { AfterViewInit, Component, ViewChild, viewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationPopupComponent } from '../reservation-popup/reservation-popup.component';
import { DeleteComponent } from '../delete/delete.component';
import { AuthService } from '../../../../../../../services/auth.service';
import { OnlineList, ReservationList, queueData } from './reserve-list.model';
import { PushComponent } from '../push/push.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.scss'
})
export class ReserveComponent implements AfterViewInit{
  displayedColumns: string[] = ['mode', 'borrowerName', 'BookTitle', 'Department', 'Queue', 'Actions'];
  dataSource = new MatTableDataSource<ReservationList>();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  reservationList: ReservationList[] = [];
  filteredreservationList: ReservationList[] = [];

  elements: any;
  material: any;
  onlineList: OnlineList[] = [];
  filteredonlineList: OnlineList[] = [];
  queueData: queueData[] = [];
  filterqueue: queueData[]=[];


  ngAfterViewInit():void{
    this.fetchReserveList();
    // this.fetchOnlineList();
    // this.fetchQueue();
  }

  fetchReserveList(): void {
    this.authService.getReserveList().subscribe(
      (data: any) => {
        console.log('Received data from Reservelist:', data);
        console.log('Type of data:', typeof data);
        this.reservationList = data as ReservationList[];
        this.filteredreservationList = this.reservationList.slice();
        this.dataSource.data = this.reservationList;
        this.dataSource.filterPredicate = (data: ReservationList, filter: string) => {
          return data.first_name.toLowerCase().includes(filter) || 
          data.title.toLowerCase().includes(filter) || 
          data.department.toLowerCase().includes(filter);  
        };
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

 
  constructor(private dialog : MatDialog,
    private authService: AuthService,
    private router: Router
  ) {
    
  }
  
  redirectToListPage() {
    // this.router.navigate(['main/borrow/reservation/reserve']); 
    this.router.navigate(['main/borrow/reservation/reserve/reservation.component']); 
  }


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
        // this.fetchOnlineList()
      }
    });
  }
  getData() {
    throw new Error('Method not implemented.');
  }


  openDialog(data: any) {
    this.Editpopup(data, 'edit Popup', ReservationPopupComponent);
  };
  
  Editpopup(id: number, title: any, component:any) {
    var _popup = this.dialog.open(component, {
      width: '55%',
      height: '760px',
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


  deleteDialog(data: any) {
    this.Deletepopup(data, 'delete', DeleteComponent)
  };

  Deletepopup(id: number, title: any, component:any) {
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

applyFilter(event: Event): void {
  const searchValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = searchValue;
}

}



 // fetchQueue(): void {
  //   this.authService.getqueue().subscribe(
  //     (queueData: any) => {
  //       console.log('Received data from queue:', queueData);
  //       this.queueData = queueData as queueData[];
  //       // Once both reservation list and queue data are fetched, combine them
  //       this.filterqueue = this.queueData.slice();
  //     },
  //     (error) => {
  //       console.error('Error fetching queue:', error);
  //     }
  //   );
  // }


  // fetchOnlineList(): void {
  //   this.authService.getOnlineList().subscribe(
  //     (data: any) => {
  //       console.log('Received data from onlinelist:', data);
  //       console.log('Type of data:', typeof data);
  //       this.onlineList = data as OnlineList[];
  //       this.filteredonlineList = this.onlineList.slice();
  //     },
  //     (error) => {
  //       console.error('Error fetching users:', error);
  //     }
  //   );
  // }