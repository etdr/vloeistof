import { Component, NgZone, ViewChild, ElementRef, OnInit, Inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {take} from 'rxjs/operators';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DrinksService } from '../drinks.service';
import { QIngredient, Drink, Ingredient } from '../types';
import { IngredientsService } from '../ingredients.service';


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
  filteredIngredients: Observable<Ingredient[]>;
  ingredients: QIngredient[] = [];
  fakeIngredients: Ingredient[] = [
    {id:0, name: 'gin', comments: ''},
    {id:0, name: 'tequila', comments: ''}
  ]
  //['gin', 'tequila', 'rum', 'whiskey', 'scotch', 'schnapps', 'lemon', 'lime', 'orange', 'peach', 'bitters',]
    // ingredientSource: Ingredient[] = [];

  ingSource: Ingredient[] = [];

  @ViewChild('ingredientsInput', {static: false}) ingredientsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  favorite: boolean = false;

  inputAmount: string = "";
  inputIngredient: string = "";
  

  constructor (private drinksService: DrinksService,
    private router: Router, private _ngZone: NgZone,
    private ingService: IngredientsService,
    public dialog: MatDialog) {
      this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
        startWith(null),
        map((ingredient: string | null) => (typeof ingredient === "string" && ingredient) ? this._filter(ingredient) : this.ingSource.slice()));
        //map((ingredient: string | null) => (ingredient) ? this._filter(ingredient) : this.fakeIngredients.slice()));
     }

  ngOnInit() {
    this.ingService.getIngs().subscribe(ings => this.ingSource = ings);
  }

  addIng(event: MatChipInputEvent): void {
    //if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      

      if ((value || '').trim()) {
        this.ingredients.push({
          id: 0,
          amount: this.inputAmount,
          name: value
        });
      }

      if (input) {
        input.value='';
        this.inputAmount= '';
      }

      this.ingredientCtrl.setValue(null);

    //}
  }
  
  remove(ingredient: QIngredient): void {
    const index = this.ingredients.indexOf(ingredient);
    
    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent) : void {
    this.ingredients.push({
      id: 0,
      name: event.option.viewValue,
      amount: this.inputAmount
    });
    this.ingredientsInput.nativeElement.value = '';
    this.inputAmount = '';
    this.ingredientCtrl.setValue(null);
  }

  private _filter(value: string): Ingredient[] {
    console.log("_filter value:",value);
    const filterValue = value.toLowerCase();

    return this.ingSource.filter(ingredient => ingredient.name.toLowerCase().indexOf(filterValue) === 0);
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

  addIngToServer() {

  }

  openAddIngDialog() {
    const dRef = this.dialog.open(AddIngDialog, {
      width: '600px'
    });

    dRef.afterClosed().subscribe(res => {
      console.log(res);
      this.ingService.postIng(res)
        .subscribe(i => this.ingSource.push(i));
      
    });
  }

}


class DialogData {
  ing: Ingredient;
}


@Component({
  selector: 'add-ing',
  templateUrl: './add-ing.html',
  styleUrls: ['./mix.component.scss']
})
export class AddIngDialog {

  ingName: string;
  ingComments: string;

  constructor (public dRef: MatDialogRef<AddIngDialog>) { }
    //@Inject(MAT_DIALOG_DATA) public data: DialogData) {


  onNoClick() {
    this.dRef.close();
  }

}