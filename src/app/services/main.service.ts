import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { HeaderService } from './header.service';
import { map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { appSettings } from '../app.settings';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(
    private http: HttpClient,
    private headers: HeaderService,
    private us: UserService
  ) {}

  private cache = new Map<string, any>();
  private baseUrl: string = appSettings.apiUrlBase;

  public get(url: string) {
    return this.http.get(this.baseUrl + url, { headers: this.headers.get() });
  }

  public put(url: string, payload: any) {
    return this.http.put(
      this.baseUrl + url,
      { ml: this.us.encryptPayload(payload) },
      {
        headers: this.headers.get(),
      }
    );
  }

  public post(url: string, payload: any) {
    return this.http.post(
      this.baseUrl + url,
      { ml: this.us.encryptPayload(payload) },
      {
        headers: this.headers.get(),
      }
    );
  }

  public delete(url: string) {
    return this.http.post(
      this.baseUrl + url,
      {},
      {
        headers: this.headers.get(),
      }
    );
  }
  submitBorrowForm(formData: any): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }
  clearCache(): void {
    this.cache.clear();
  }

  public getReturnListById(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}returned-list/${userId}`);
  }

  public getcirculationuser(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}circulation/get-user/${userId}`);
  }
}

//  nasa auth.service yung para sa mga tables
