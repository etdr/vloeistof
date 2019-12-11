import { Component, OnInit, Inject, ViewChild, NgZone } from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';

import { DrinksService } from '../../drinks.service';
import { AuthService } from '../../auth/auth.service';
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
              public dialog: MatDialog,
              private authService: AuthService) { }

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

  favoriteDrink(drink: Drink) {
    this.drinksService.modifyDrink({
      id: drink.id,
      userId: drink.userId,
      name: drink.name,
      ingredients: drink.ingredients,
      instructions: drink.instructions,
      thumbUrl: drink.thumbUrl,
      cDBId: drink.cDBId,
      favorite: !drink.favorite
    }).subscribe(() => {
      drink.favorite = !drink.favorite;
    });
  }


  openDialog(drink) {
    const dRef = this.dialog.open(ModifyDrinkDialog, {
      width: '1000px',
      data: {
        drink
      }
    });

    dRef.afterClosed().subscribe(res => {
      console.log(res);
      // actually modify drink here
      if (res) {
        this.drinksService.modifyDrink({
          name: res.name,
          ingredients: res.ingredients,
          instructions: res.instructions,
          thumbUrl: res.thumbUrl,
          cDBId: res.cDBId,
          favorite: res.favorite,
          id: res.id,
          userId: res.userId
        }).subscribe((res) => console.log(res))
      }

    })
  }

  openConfirmDialog(drinkid) {
    const dRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '600px'
    });

    dRef.afterClosed().subscribe(() => {
      // actually delete drink here
      this.drinksService.deleteDrink(drinkid)
        .subscribe(() => undefined);
      
      this.drinks = this.drinks.filter(d => d.id !== drinkid);

    })
  }


}



@Component({
  selector: 'modify-drink-dialog',
  templateUrl: 'modify-dialog.html',
  styleUrls: ['./drinkslist.component.scss']
})
export class ModifyDrinkDialog {

  ingredients: QIngredient[];
  inputAmount: string;
  inputIngredient: string;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private _ngZone: NgZone, public dRef: MatDialogRef<ModifyDrinkDialog>,
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

  flipFavorite (drink) {
    console.log(drink.favorite);
    drink.favorite = !drink.favorite;
    console.log(drink.favorite);
  }
  
  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}



@Component({
  selector: 'confirm-delete-dialog',
  templateUrl: 'confirm-delete.html'
})
export class ConfirmDeleteDialog {

  constructor(public dRef: MatDialogRef<ConfirmDeleteDialog>) { }

  onNoClick() {
    this.dRef.close()
  }

  

}