import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth/auth.service';
import { Drink, Ingredient, QIngredient } from './types';

const BASEURL = "https://vloeistof-server.herokuapp.com/api/ing";

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  })
};


@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getIngs () {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.token);
    return this.http.get<Ingredient[]>(BASEURL, httpOptions);
  }

  postIng (ing: Ingredient) {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.token);
    return this.http.post<Ingredient>(BASEURL+'/new', {ing}, httpOptions);
  }
}
