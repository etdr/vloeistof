import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import { User } from '../types';

const BASEURL = "https://vloeistof-server.herokuapp.com/api/admin";


let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  })
};


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  
  getUsers() {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.token);
    return this.http.get<User[]>(BASEURL, httpOptions);
  }

  deleteUser(uId: number) {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.token);
    return this.http.delete(BASEURL+'/'+uId.toString(), httpOptions);
  }
  
}
