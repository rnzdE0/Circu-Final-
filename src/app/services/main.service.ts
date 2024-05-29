import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { HeaderService } from './header.service';
import { map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private http: HttpClient,
    private headers: HeaderService
  ) { }
  
  private cache = new Map<string, any>();
   private baseUrl:string = 'http://127.0.0.1:8000/api/';
  // private baseUrl:string = 'http://192.168.68.124:8000/api/';
  // private baseUrl:string = 'http://192.168.10.122:8000/api/';
  //private baseUrl:string = 'http://192.168.18.185:8000/api/';
  // private baseUrl:string = 'http://26.68.32.39:8000/api/';

  public get(url: string) {
    return this.http.get(this.baseUrl+url, { headers: this.headers.get() });
  }

  public put(url: string, payload: any) {
    return this.http.put(this.baseUrl+url, {payload:JSON.stringify(payload)}, { headers: this.headers.get() });
  }

  public post(url: string, payload: any) {
    return this.http.post(this.baseUrl+url, {payload:JSON.stringify(payload)}, { headers: this.headers.get() });
  }

  public delete(url: string) {
    return this.http.delete(this.baseUrl+url, { headers: this.headers.get() });
  }
  submitBorrowForm(formData: any): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }
  clearCache(): void {
    this.cache.clear();
  }
}

//  nasa auth.service yung para sa mga tables
