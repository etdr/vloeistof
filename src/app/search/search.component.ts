import { Component, OnInit } from '@angular/core';

import { SearchService } from '../search.service';
import { Drink } from '../types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  term: string = "";
  results: Drink[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }


  searchByName () {
    this.searchService.getDrinksByName(this.term)
      .subscribe(cdos => {
        const drinkResults = [];
        for (let cdo of cdos) {
          let d = new Drink();
          d.name = cdo.strDrink;
          d.instructions = cdo.strInstructions;
          d.thumbUrl = cdo.strDrinkThumb;
          d.ingredients = [];
          for (let i = 0; i < 15; i++) {
            if (cdo['strIngredient'+(i+1).toString()]) {
              d.ingredients.push({
                amount: cdo['strMeasure'+(i+1).toString()],
                name: cdo['strIngredient'+(i+1).toString()],
                id: 0
              })
            }
          }
          drinkResults.push(d);
        }
        this.results = drinkResults; 
      });
    console.log(this.results);
  }

  searchByIngredient () {
    this.searchService.getDrinksByIngredient(this.term)
      .subscribe(cdos => {
        const drinkResults = [];
        for (let cdo of cdos) {
          let d = new Drink();
          d.name = cdo.strDrink;
          d.thumbUrl = cdo.strDrinkThumb;
          d.cDBId = parseInt(cdo.idDrink,10);
          drinkResults.push(d)
        }
      
    });
  }

}
