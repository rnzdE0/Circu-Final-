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
  reservationList: ReservationList[] = [];
  filteredreservationList: ReservationList[] = [];
  elements: any;
  material: any;
  onlineList: OnlineList[] = [];
  filteredonlineList: OnlineList[] = [];


  ngOnInit():void{
    this.fetchReserveList();
    this.fetchOnlineList();
  }

  fetchReserveList(): void {
    this.authService.getReserveList().subscribe(
      (data: any) => {
        console.log('Received data from Reservelist:', data);
        console.log('Type of data:', typeof data);
        this.reservationList = data as ReservationList[];
        this.filteredreservationList = this.reservationList.slice();
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  fetchOnlineList(): void {
    this.authService.getOnlineList().subscribe(
      (data: any) => {
        console.log('Received data from onlinelist:', data);
        console.log('Type of data:', typeof data);
        this.onlineList = data as OnlineList[];
        this.filteredonlineList = this.onlineList.slice();
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  constructor(private dialog : MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}
  
  redirectToListPage() {
    this.router.navigate(['main/borrow/reservation/reserve']); 
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
        this.fetchOnlineList()
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
  console.log('Filtering...');
  const searchValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  console.log('Search value:', searchValue);
  if (!searchValue) {
    this.filteredreservationList = this.reservationList.slice(); // Reset filter
    return;
  }
  this.filteredreservationList = this.reservationList.filter(material =>
    material.user.patron.patron.toLowerCase().includes(searchValue) ||
    material.user.id.toString().toLowerCase().includes(searchValue) ||
    material.user.program.department.department.toLowerCase().includes(searchValue) ||
    material.book_id.toString().toLowerCase().includes(searchValue) ||
    material.user.program.category.toLowerCase().includes(searchValue)
  );

  console.log('Filtered result:', this.filteredreservationList);

  if (!searchValue) {
    this.filteredonlineList = this.onlineList.slice(); // Reset filter
    return;
  }
  this.filteredonlineList = this.onlineList.filter(material =>
    material.user.patron.patron.toLowerCase().includes(searchValue) ||
    material.user.id.toString().toLowerCase().includes(searchValue) ||
    material.user.program.department.department.toLowerCase().includes(searchValue) ||
    material.book_id.toString().toLowerCase().includes(searchValue) ||
    material.user.program.category.toLowerCase().includes(searchValue)
  );

  console.log('Filtered result:', this.filteredreservationList);
}

}
