import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { QIngredient } from '../types';

export interface MixIng {
  name: string;
}

@Component({
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.scss']
})

export class MixComponent {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  mixIng: MixIng[] = [
    {name: 'Vodka'},
    {name: 'Tequila'},
    {name: 'Rum'},
    {name: 'Triple Sec'}
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.mixIng.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }
  remove(mixIng: MixIng): void {
    const index = this.mixIng.indexOf(mixIng);

    if (index >= 0) {
      this.mixIng.splice(index, 1);
    }
  }
} 
