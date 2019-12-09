import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';

import { DrinksService } from '../drinks.service';
import { QIngredient, Drink } from '../types';


const MEASUREMENTS = ['oz ', 'ozs ', 'ounces ', 'part ', 'parts ', 'cl ', 'cls ', 'ml ', 'mls ', 'qt ', 'qts ',
                      'liter ', 'L ', 'Ls ', 'l ', 'ls ', 'splash ', 'splashes ', 'dash ', 'dashes ']


@Component({
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.scss']
})
export class MixComponent {

  drinkName: string = "";
  instructions: string = "";

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  ings: QIngredient[] = [];

  constructor (private drinksService: DrinksService,
    private router: Router) { }


  splitIngredient (qstr: string): string[] {
    let a = ''; let i = '';
    for (let m of MEASUREMENTS) {
      if (qstr.indexOf(m) >= 0) {
        let spl = qstr.indexOf(m);
        a = qstr.slice(0, spl + m.length);
        i = qstr.slice(spl + m.length );
      }
    }
    if (i.indexOf("of ") >= 0) i = i.split("of ")[1];
    console.log('amount', a, '; ing', i);
    return [a, i];
  }



  addIng(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    const [a, i] = this.splitIngredient(value);

    if ((value || '').trim()) {
      this.ings.push({name: i,
        amount: a,
        id: 0
      });
    }
    if (input) {
      input.value = '';
    }


  }


  remove(i: QIngredient): void {
    const index = this.ings.indexOf(i);

    if (index >= 0) {
      this.ings.splice(index, 1);
    }
  }


  addDrink () {
    this.drinksService.addDrink({
      name: this.drinkName,
      id: 0,
      ingredients: this.ings,
      instructions: this.instructions,
      thumbUrl: '',
      userId: 0,
      cDBId: 0
    }).subscribe(res => console.log(res));

    this.router.navigate(['/drinks']);
  }
} 
