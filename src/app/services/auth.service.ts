import { Injectable } from '@angular/core';
import { HeaderService } from './header.service';
import { HttpClient,  HttpParams } from '@angular/common/http';
import { response } from 'express';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private headers: HeaderService
  ) { }

// ruter ni sir ip
    private url:string = 'http://127.0.0.1:8000/api/';

//  private url:string = 'http://192.168.18.185:8000/api/';

// wifi ni brent
//private url:string = 'http://192.168.68.3:8000/api/';

// hotspot ni mae
// private url:string = 'http://192.168.10.122:8000/api/';

// hotspot ni jambe
//private url:string = 'http://192.168.18.185:8000/api/';

// vpn ip
//// private url:string = 'http://26.68.32.39:8000/api/'; 


  public login(formData: FormData) {
    return this.http.post(this.url+'login/circulation', formData).pipe(
      // return this.http.post(this.url+'login/circulation', formData).pipe(
      tap((res: any) => {
        if(res.token) {
          console.log(res)
          sessionStorage.setItem('auth-token', res.token);
          sessionStorage.setItem('name', res.displayName);
          sessionStorage.setItem('role', res.position);

          let time = new Date();
          time.setMinutes(time.getMinutes() + 55);
          sessionStorage.setItem('request-token', time.toISOString());
        }
      })
    );
  }

  // for tables

  public user() {
    return this.http.get(this.url + 'user', { headers: this.headers.get() });
  }

  public refresh() {
    return this.http.post(this.url + 'refresh', {}, { headers: this.headers.get() })
  } 

  public logout() {
    return this.http.post(this.url + 'logout', {}, { headers: this.headers.get() })
  }

  public getUsers() {
    return this.http.get(this.url + 'circulation/userlist', { headers: this.headers.get() });
  }

  public getBorrowList(){
    return this.http.get(this.url + 'circulation/borrow-list',  {headers: this.headers.get()})
  }

  public getReserveList(){
    return this.http.get(this.url + 'circulation/reservelist', {headers: this.headers.get()})
  }

  public getOnlineList(){
    return this.http.get(this.url + 'reservation-list/online', {headers: this.headers.get()})
  }

  getBorrowersReport(params: HttpParams) {
    return this.http.get(this.url + 'circulation/report', { 
      headers: this.headers.get(),
      params: params
    });
  }

  topBorrowers(params: HttpParams) {
    return this.http.get(this.url + 'circulation/topborrowers', {
      headers: this.headers.get(),
      params: params
    });
  }

  mostBorrowedBook(params: HttpParams) {
    return this.http.get(this.url + 'circulation/mostborrowed', {
      headers: this.headers.get(),
      params: params
    });
  }

  public getReturned(){
    return this.http.get(this.url + 'circulation/returned-list', {headers: this.headers.get() })
  }

  // public mostBorrowedBook(){
  //   return this.http.get(this.url + 'mostborrowed', {headers: this.headers.get() })
  // }

  // public topBorrowers(){
  //   return this.http.get(this.url + 'topborrowers', {headers: this.headers.get() })
  // }

  public getqueue(){
    return this.http.get(this.url + 'queue', {headers: this.headers.get() })
  }


}
