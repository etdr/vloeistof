import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

const BASEURL = "https://vloeistof-server.herokuapp.com/api/donate";

class PaymentIntent {
  clientSecret: string;
}

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  })
};

@Injectable({
  providedIn: 'root'
})
export class DonateService {

  constructor(private authService: AuthService,
              private http: HttpClient) { }


  setAmount (a: number) {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.token);
    return this.http.post<PaymentIntent>(BASEURL+'/test', {amount: a}, httpOptions);
    //return this.http.post<PaymentIntent>(BASEURL, {amount: a}, httpOptions);
  }
}
