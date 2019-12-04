import { Component, OnInit } from '@angular/core';

import { QIngredient } from '../types';

@Component({
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.scss']
})
export class MixComponent implements OnInit {

  ingredients: QIngredient[] = [];

  inputAmount: string = "";
  inputIngredient: string = "";


  constructor() { }

  ngOnInit() {
  }


  addIngToList (): void {
    this.ingredients.push({
      id: 0,
      amount: this.inputAmount,
      name: this.inputIngredient
    })
    this.inputAmount = "";
    this.inputIngredient = "";
    console.log(this.ingredients);
  }

}
