import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor(private us: UserService) {}

  public get() {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + this.us.savedAuth?.authToken || '',
    });

    return headers;
  }
}
