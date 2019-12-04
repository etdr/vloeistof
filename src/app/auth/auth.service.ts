import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASEURL = "https://vloeistof-server.herokuapp.com/api/user";

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

  constructor(private http: HttpClient) { }




  signup(username:string, email:string, password:string) {
    return this.http.post<Response>(BASEURL+"/signup",{
      user: {
        username,
        email,
        password
      }
    }, httpOptions)
      .subscribe(res => localStorage.setItem("token", res.token));
  }

  signin(username:string, password:string) {
    return this.http.post<Response>(BASEURL+"/signin", {
      user: {
        username,
        password
      }
    }, httpOptions)
      .subscribe(res => localStorage.setItem("token", res.token));
  }

  logout () {
    localStorage.removeItem("token");
  }

}
