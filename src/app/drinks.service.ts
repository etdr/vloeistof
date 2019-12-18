import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth/auth.service';
import { Drink, Ingredient, QIngredient } from './types';
import { APIURL } from '../environments/environment.prod';

const BASEURL = APIURL+"/api/drinks";



@Injectable({
  providedIn: 'root'
})
export class DrinksService {

  drinks: Drink[] = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  
  getMyDrinks() {
    return this.http.get<Drink[]>(BASEURL+"/user/"+this.authService.userId.toString());
  }

  getCreatedDrinks() {
    return this.http.get<Drink[]>(BASEURL+"/user/"+this.authService.userId.toString()+"/created");
  }

  getAPIDrinks() {
    return this.http.get<Drink[]>(BASEURL+"/user/"+this.authService.userId.toString()+"/api");
  }

  getFavoriteDrinks() {
    return this.http.get<Drink[]>(BASEURL+"/user/"+this.authService.userId.toString()+"/favorite");
  }

  getAllDrinks (): Observable<Drink[]> {
    return this.http.get<Drink[]>(BASEURL);
  }



  
  addDrink (drink: Drink): Observable<Drink> {
    return this.http.post<Drink>(BASEURL+"/new", {drink});

  }


  modifyDrink (drink: Drink): Observable<number> {
    return this.http.put<number>(BASEURL+'/'+drink.id.toString(), {drink});
  }


  deleteDrink (drinkId: number): Observable<number> {
    return this.http.delete<number>(BASEURL+'/'+drinkId.toString());
  }

}
