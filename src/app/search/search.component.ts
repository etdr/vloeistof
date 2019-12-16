import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SearchService } from '../search.service';
import { DrinksService } from '../drinks.service';
import { Drink } from '../types';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  term: string = "";
  results: Drink[] = [];
  searchType: string = "n";

  constructor(private searchService: SearchService,
              private drinksService: DrinksService,
              private router: Router) { }

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
          d.cDBId = parseInt(cdo.idDrink, 10)
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
          d.ingredients = [];
          drinkResults.push(d);
        }
        this.results = drinkResults;
    });
  }

  addDrink (drink) {
    this.drinksService.addDrink(drink).subscribe(() => {this.router.navigateByUrl('/drinks/my');});
    
  }

  fetchDrinkData(d: Drink) {
    if (!d.instructions) {
      this.searchService.getDrink(d.cDBId).subscribe(res => {
        if (d.ingredients.length === 0) {
          let newings = [];
          for (let i = 0; i < 15; i++) {
            if (res['strIngredient'+(i+1).toString()]) {
              newings.push({
                amount: res['strMeasure'+(i+1).toString()],
                name: res['strIngredient'+(i+1).toString()],
                id: 0
              });
            }
          }
          d.ingredients = newings;
        }
        if (!d.instructions) {

          d.instructions = res.strInstructions;
        }
      });
    }
  }

  fetchInstructions(dId: Drink) {

  }

}
