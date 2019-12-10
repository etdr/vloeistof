import { Component, NgZone, ViewChild, ElementRef, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {take} from 'rxjs/operators';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { DrinksService } from '../drinks.service';
import { QIngredient, Drink, Ingredient } from '../types';


const MEASUREMENTS = ['oz ', 'ozs ', 'ounces ', 'part ', 'parts ', 'cl ', 'cls ', 'ml ', 'mls ', 'qt ', 'qts ',
                      'liter ', 'L ', 'Ls ', 'l ', 'ls ', 'splash ', 'splashes ', 'dash ', 'dashes ']


@Component({
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.scss']
})
export class MixComponent implements OnInit {

  drinkName: string = "";
  instructions: string = "";

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredientCtrl = new FormControl();
  filteredIngredients: Observable<string[]>;
  ingredients: QIngredient[] = [];
  // ingredientSource: Ingredient[] = [];
  fakeIngredients: string[] = ['gin', 'tequila', 'rum', 'whiskey', 'scotch', 'schnapps', 'lemon', 'lime', 'orange', 'peach', 'bitters',]

  @ViewChild('ingredientsInput', {static: false}) ingredientsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  favorite: boolean = false;

  inputAmount: string = "";
  inputIngredient: string = "";
  

  constructor (private drinksService: DrinksService,
    private router: Router, private _ngZone: NgZone) {
      this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
        startWith(null),
        map((ingredient: string | null) => ingredient ? this._filter(ingredient) : this.fakeIngredients.slice()));
     }

  ngOnInit() {

  }

  addIng(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

    if ((value || '').trim()) {
      this.ingredients.push({
        id: 0,
        amount: this.inputAmount,
        name: this.inputIngredient
      })
    }

    if (input) {
      input.value='';
      this.inputAmount= '';
    }

    this.ingredientCtrl.setValue(null);

  }
  }
  
  remove(ingredient: QIngredient): void {
    const index = this.ingredients.indexOf(ingredient);
    
    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent) : void {
    // this.ingredients.push(event.option.viewValue);
    this.ingredientsInput.nativeElement.value = '';
    this.ingredientCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.fakeIngredients.filter(ingredient => ingredient.toLowerCase().indexOf(filterValue) === 0);
  }


  addDrink () {
    this.drinksService.addDrink({
      name: this.drinkName,
      id: 0,
      ingredients: this.ingredients,
      instructions: this.instructions,
      thumbUrl: '',
      userId: 0,
      cDBId: 0,
      favorite: this.favorite
    }).subscribe(res => console.log(res));

    this.router.navigate(['/drinks']);
  }

  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

}



// export class MixComponent {

  // drinkName: string = "";
  // instructions: string = "";

//   visible = true;
//   selectable = true;
//   removable = true;
//   addOnBlur = true;
//   readonly separatorKeysCodes: number[] = [ENTER, COMMA];
//   ings: QIngredient[] = [];

//   constructor (private drinksService: DrinksService) { }


//   splitIngredient (qstr: string): string[] {
//     let a = ''; let i = '';
//     for (let m of MEASUREMENTS) {
//       if (qstr.indexOf(m) >= 0) {
//         let spl = qstr.indexOf(m);
//         a = qstr.slice(0, spl + m.length);
//         i = qstr.slice(spl + m.length );
//       }
//     }
//     if (i.indexOf("of ") >= 0) i = i.split("of ")[1];
//     console.log('amount', a, '; ing', i);
//     return [a, i];
//   }



//   add(event: MatChipInputEvent): void {
//     const input = event.input;
//     const value = event.value;

//     const [a, i] = this.splitIngredient(value);

//     if ((value || '').trim()) {
//       this.ings.push({name: i,
//         amount: a,
//         id: 0
//       });
//     }
//     if (input) {
//       input.value = '';
//     }
//   }
//   remove(i: QIngredient): void {
//     const index = this.ings.indexOf(i);

//     if (index >= 0) {
//       this.ings.splice(index, 1);
//     }
//   }


  // addDrink () {
  //   this.drinksService.addDrink({
  //     name: this.drinkName,
  //     id: 0,
  //     ingredients: this.ings,
  //     instructions: this.instructions,
  //     thumbUrl: '',
  //     userId: 0,
  //     cDBId: 0
  //   }).subscribe(res => console.log(res));
  // }
// } 
