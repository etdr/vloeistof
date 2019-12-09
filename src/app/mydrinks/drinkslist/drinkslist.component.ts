import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';

import { DrinksService } from '../../drinks.service';
import { Drink, QIngredient } from 'src/app/types';

export interface DialogData {
  drink: Drink
}

@Component({
  selector: 'app-drinkslist',
  templateUrl: './drinkslist.component.html',
  styleUrls: ['./drinkslist.component.scss']
})
export class DrinksListComponent implements OnInit {

  drinks: Drink[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private drinksService: DrinksService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.route.url
      .subscribe(urlSeg => {
        const url = urlSeg[0].path;
        switch (url) {
          case 'my':
            this.drinksService.getMyDrinks().subscribe(ds => this.drinks = ds); break;
          case 'created':
            this.drinksService.getCreatedDrinks().subscribe(ds => this.drinks = ds); break;
          case 'api':
            this.drinksService.getAPIDrinks().subscribe(ds => this.drinks = ds); break;
          case 'favorite':
            this.drinksService.getFavoriteDrinks().subscribe(ds => this.drinks = ds); break;
          case 'all':
            this.drinksService.getAllDrinks().subscribe(ds => this.drinks = ds); break;
        }
      });
  }


  openDialog(drink) {
    const dRef = this.dialog.open(ModifyDrinkDialog, {
      width: '600px',
      data: {
        drink
      }
    });

    dRef.afterClosed().subscribe(res => {
      // actually modify drink here
      this.drinksService.modifyDrink({
        name: res.name,
        ingredients: res.ingredients,
        instructions: res.instructions,
        thumbUrl: res.thumbUrl,
        cDBId: res.cDBId,
        id: res.id,
        userId: res.userId
      }).subscribe(() => undefined)

    })
  }


}



@Component({
  selector: 'modify-drink-dialog',
  templateUrl: 'modify-dialog.html'
})
export class ModifyDrinkDialog {

  ingredients: QIngredient[];
  inputAmount: string;
  inputIngredient: string;

  selectable = true;
  removable = true;

  constructor(public dRef: MatDialogRef<ModifyDrinkDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  onNoClick() {
    this.dRef.close();
  }


  addIng(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.data.drink.ingredients.push({
        id: 0,
        amount: this.inputAmount,
        name: this.inputIngredient
      })
    }

    if (input) {
      input.value='';
      this.inputAmount= '';
    }


  }
  
  remove(ingredient: QIngredient): void {
    const index = this.data.drink.ingredients.indexOf(ingredient);
    
    if (index >= 0) {
      this.data.drink.ingredients.splice(index, 1);
    }

  }
}