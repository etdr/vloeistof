import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, finalize } from 'rxjs/operators';

import { Router } from '@angular/router';
import { APIURL } from '../../environments/environment.prod';

const BASEURL = APIURL+"/api/user";
//const BASEURL = "http://localhost:3016/api/user";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

class Response {
  token: string;
  user: {
    id: number,
    username: string,
    email: string,
    admin: boolean
  }
}

class Username {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = (localStorage.getItem('token') || '');
  admin: boolean = (localStorage.getItem('admin') == 'true');
  userId: number = localStorage.getItem('userId') == null ? 0 : parseInt(localStorage.getItem('userId'), 10);
  //userId: number | undefined = localStorage.getItem('userId');

  constructor(private http: HttpClient, private router: Router) { }




  signup(username:string, email:string, password:string) {
    console.log("signing up");
    console.log(BASEURL+"/signup");
    return this.http.post<Response>(BASEURL+"/signup", JSON.stringify({
      user: {
        username,
        email,
        password
      }
    }), httpOptions).pipe(
      tap(res => localStorage.setItem("token", res.token)),
      tap(res => this.token = res.token),
      tap(res => localStorage.setItem("userId", res.user.id.toString())),
      tap(res => this.userId = res.user.id),
      tap(res => localStorage.setItem("admin", res.user.admin ? "true" : "false")),
      tap(res => this.admin = res.user.admin),
      finalize(() => this.router.navigateByUrl("/drinks"))
    );
  }

  signin(username:string, password:string) {
    return this.http.post<Response>(BASEURL+"/signin", {
      user: {
        username,
        password
      }
    }, httpOptions).pipe(
      tap(res => localStorage.setItem("token", res.token)),
      tap(res => this.token = res.token),
      tap(res => localStorage.setItem("userId", res.user.id.toString())),
      tap(res => this.userId = res.user.id),
      tap(res => localStorage.setItem("admin", res.user.admin ? "true" : "false")),
      tap(res => this.admin = res.user.admin),
      finalize(() => this.router.navigateByUrl("/drinks"))
    );
  }

  logout () {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("userId");
    this.token = '';
    this.userId = 0;
    this.admin = false;
    this.router.navigateByUrl("/login");
  }


  getUsername(userId: number) {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.token);
    return this.http.get<Username>(BASEURL+"/"+userId.toString(), httpOptions);
  }


}
