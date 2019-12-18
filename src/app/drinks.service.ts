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

  
  getMyDrinks(p, pS) {
    return this.http.get<Drink[]>(BASEURL
      +"/user/"+this.authService.userId.toString()
      +"?page="+p.toString()
      +"&pageSize="+pS.toString());
  }

  getCreatedDrinks(p, pS) {
    return this.http.get<Drink[]>(BASEURL
      +"/user/"+this.authService.userId.toString()
      +"/created"
      +"?page="+p.toString()
      +"&pageSize="+pS.toString());
  }

  getAPIDrinks(p, pS) {
    return this.http.get<Drink[]>(BASEURL
      +"/user/"+this.authService.userId.toString()
      +"/api"
      +"?page="+p.toString()
      +"&pageSize="+pS.toString());
  }

  getFavoriteDrinks(p, pS) {
    return this.http.get<Drink[]>(BASEURL
      +"/user/"+this.authService.userId.toString()
      +"/favorite"
      +"?page="+p.toString()
      +"&pageSize="+pS.toString());
  }

  getAllDrinks (p, pS): Observable<Drink[]> {
    return this.http.get<Drink[]>(BASEURL+"?page="+p.toString()+"&pageSize="+pS.toString());
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
