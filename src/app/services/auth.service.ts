import { Injectable } from '@angular/core';
import { HeaderService } from './header.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { response } from 'express';
import { Observable, tap } from 'rxjs';
import { appSettings } from '../app.settings';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private headers: HeaderService,
    private us: UserService
  ) {}

  private url: string = appSettings.apiUrlBase;

  public login(formData: FormData) {
    return this.http.post(this.url + 'login/circulation', formData).pipe(
      // return this.http.post(this.url+'login/circulation', formData).pipe(
      tap((res: any) => {
        if (res.token) {
          // console.log(res)
          const encrypted = this.us.encryptPayload({
            authToken: res.token,
            name: res.displayName,
            role: res.position,
          });

          sessionStorage.setItem('xs', encrypted);

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
    return this.http.post(
      this.url + 'refresh',
      {},
      { headers: this.headers.get() }
    );
  }

  public logout() {
    return this.http.post(
      this.url + 'logout',
      {},
      { headers: this.headers.get() }
    );
  }

  public getUsers() {
    return this.http.get(this.url + 'circulation/userlist', {
      headers: this.headers.get(),
    });
  }

  public getBorrowList() {
    return this.http.get(this.url + 'circulation/borrow-list', {
      headers: this.headers.get(),
    });
  }

  public getReserveList() {
    return this.http.get(this.url + 'circulation/reservelist', {
      headers: this.headers.get(),
    });
  }

  public getOnlineList() {
    return this.http.get(this.url + 'reservation-list/online', {
      headers: this.headers.get(),
    });
  }

  getBorrowersReport(params: HttpParams) {
    return this.http.get(this.url + 'circulation/report', {
      headers: this.headers.get(),
      params: params,
    });
  }

  topBorrowers(params: HttpParams) {
    return this.http.get(this.url + 'circulation/topborrowers', {
      headers: this.headers.get(),
      params: params,
    });
  }

  mostBorrowedBook(params: HttpParams) {
    return this.http.get(this.url + 'circulation/mostborrowed', {
      headers: this.headers.get(),
      params: params,
    });
  }

  public getReturned() {
    return this.http.get(this.url + 'circulation/returned-list', {
      headers: this.headers.get(),
    });
  }

  // public mostBorrowedBook(){
  //   return this.http.get(this.url + 'mostborrowed', {headers: this.headers.get() })
  // }

  // public topBorrowers(){
  //   return this.http.get(this.url + 'topborrowers', {headers: this.headers.get() })
  // }

  public getqueue() {
    return this.http.get(this.url + 'queue', { headers: this.headers.get() });
  }
}
