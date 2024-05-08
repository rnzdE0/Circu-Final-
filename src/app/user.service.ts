import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService 
{

  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getUserList(): Observable<any[]> 
  {
    //return this.http.get<any[]>(`${this.baseUrl}/users`);

    const url = 'http://127.0.0.1:8000/users';
    console.log('API endpoint:', url); 
    return this.http.get<any[]>(url);
  }
}
