import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { QIngredient, Drink, Ingredient, CDBDrink, CDBDrinksObject,
         CDBDrinkMin, CDBDrinkMinObject } from './types';
import { of } from 'rxjs';

const BASEURL = "https://www.thecocktaildb.com/api/json/v2/9973533/";

// const cDBIngFields = ['strIngredient1','strIngredient2','strIngredient3','strIngredient4','strIngredient5',
//                       'strIngredient6','strIngredient7','strIngredient8','strIngredient9','strIngredient10',
//                       'strIngredient11','strIngredient12','strIngredient13','strIngredient14','strIngredient15']
// const cDBMeasureFields = ['strMeasure1','strMeasure2','strMeasure3','strMeasure4','strMeasure5',
//                           'strMeasure6','strMeasure7','strMeasure8','strMeasure9','strMeasure10',
//                           'strMeasure11','strMeasure12','strMeasure13','strMeasure14','strMeasure15']

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  //drinkResults: Drink[];
  //ingResults: Ingredient[];
  

  constructor(private http: HttpClient) { }




  getDrinksByName (term: string) {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<CDBDrinksObject>(BASEURL+'search.php?s='+encodeURIComponent(term)).pipe(map(x => x.drinks))

  }

  getDrinksByIngredient (term: string) {
    if (!term.trim()) {
      return of ([]);
    }
    return this.http.get<CDBDrinkMinObject>(BASEURL+'filter.php?i='+encodeURIComponent(term)).pipe(map(x => x.drinks))
      
  }

}
