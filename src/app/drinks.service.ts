import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth/auth.service';
import { Drink, Ingredient, QIngredient } from './types';

const BASEURL = "https://vloeistof-server.herokuapp.com/api/drinks";

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  })
};


@Injectable({
  providedIn: 'root'
})
export class DrinksService {

  drinks: Drink[] = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  
  getMyDrinks() {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.token);
    return this.http.get<Drink[]>(BASEURL+"/user/"+this.authService.userId.toString(), httpOptions);
  }

  getCreatedDrinks() {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.token);
    return this.http.get<Drink[]>(BASEURL+"/user/"+this.authService.userId.toString()+"/created", httpOptions);
  }

  getAPIDrinks() {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.token);
    return this.http.get<Drink[]>(BASEURL+"/user/"+this.authService.userId.toString()+"/api", httpOptions);
  }

  getFavoriteDrinks() {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.token);
    return this.http.get<Drink[]>(BASEURL+"/user/"+this.authService.userId.toString()+"/favorite", httpOptions);
  }

  getAllDrinks (): Observable<Drink[]> {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.token);
    return this.http.get<Drink[]>(BASEURL, httpOptions);
  }



  
  addDrink (drink: Drink): Observable<Drink> {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.token);
    return this.http.post<Drink>(BASEURL+"/new", {drink}, httpOptions)

  }


  modifyDrink (drink: Drink): Observable<number> {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.token);
    return this.http.put<number>(BASEURL+'/'+drink.id, {drink}, httpOptions)
  }


  deleteDrink (drinkId: number): Observable<number> {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.token);
    return this.http.delete<number>(BASEURL+'/'+drinkId, httpOptions)
  }

}
