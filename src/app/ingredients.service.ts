import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth/auth.service';
import { Drink, Ingredient, QIngredient } from './types';
import { APIURL } from '../environments/environment.prod';

const BASEURL = APIURL+"/api/ing";



@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getIngs () {
    return this.http.get<Ingredient[]>(BASEURL);
  }

  postIng (ing: Ingredient) {
    return this.http.post<Ingredient>(BASEURL+'/new', {ing});
  }
}
