import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { QIngredient, Drink, Ingredient, CDBDrink, CDBDrinksObject } from './types';

const BASEURL = "https://www.thecocktaildb.com/api/json/v2/9973533/search.php?";

const cDBIngFields = ['strIngredient1','strIngredient2','strIngredient3','strIngredient4','strIngredient5',
                      'strIngredient6','strIngredient7','strIngredient8','strIngredient9','strIngredient10',
                      'strIngredient11','strIngredient12','strIngredient13','strIngredient14','strIngredient15']
const cDBMeasureFields = ['strMeasure1','strMeasure2','strMeasure3','strMeasure4','strMeasure5',
                          'strMeasure6','strMeasure7','strMeasure8','strMeasure9','strMeasure10',
                          'strMeasure11','strMeasure12','strMeasure13','strMeasure14','strMeasure15']

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  drinkResults: Drink[];
  ingResults: Ingredient[];
  

  constructor(private http: HttpClient) { }




  getDrinksByName (term: string): void {
    if (!term.trim()) {
      this.drinkResults = [];
    }
    this.http.get<CDBDrinksObject>(BASEURL+'s='+encodeURIComponent(term)).pipe(map(x => x.drinks))
      .subscribe(cdos => {
        this.drinkResults = [];
        for (let cdo of cdos) {
          let d = new Drink();
          d.name = cdo.strDrink;
          d.instructions = cdo.strInstructions;
          for (let i = 0; i < 15; i++) {
            if (d['strIngredient'+(i+1).toString()]) {
              d.ingredients.push({
                amount: cdo['strMeasure'+(i+1).toString()],
                name: cdo['strIngredient'+(i+1).toString()],
                id: 0
              })
            }
          }
          this.drinkResults.push(d);
        }
      })
    console.log(this.drinkResults);
  }

}
