import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth/auth.service';
import { Drink, Ingredient, QIngredient } from './types';

const BASEURL = "https://vloeistof-server.herokuapp.com/api";

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

  

  getDrinks (): Observable<Drink[]> {
    httpOptions.headers = httpOptions.headers.set('Authorization', this.authService.token);
    
    return this.http.get<Drink[]>(BASEURL+"/drinks", httpOptions);
  }


  
  addDrink (drink: Drink): Observable<Drink> {
    return this.http.post<Drink>(BASEURL+"/drinks/new", drink, httpOptions)

  }


  modifyDrink (drink: Drink): Observable<number> {
    return this.http.put<number>(BASEURL+'/drinks/'+drink.id, drink, httpOptions)
  }


  deleteDrink (drinkId: number): Observable<number> {
    return this.http.delete<number>(BASEURL+'/drinks/'+drinkId, httpOptions)
  }

}
