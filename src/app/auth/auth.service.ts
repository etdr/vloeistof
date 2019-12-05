import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, finalize } from 'rxjs/operators';

import { Router } from '@angular/router';

const BASEURL = "https://vloeistof-server.herokuapp.com/api/user";
//const BASEURL = "http://localhost:3016/api/user";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

class Response {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
      finalize(() => this.router.navigateByUrl("/drinks"))
    );
  }

  logout () {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }

}
