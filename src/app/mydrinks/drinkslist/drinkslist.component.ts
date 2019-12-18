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
import { PostboxComponent } from './postbox/postbox.component';

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

  page: number = 0;
  pageSize: number = 10;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private drinksService: DrinksService,
              public dialog: MatDialog,
              public authService: AuthService) { }

  ngOnInit() {
    this.getDrinks();
  }

  getDrinks() {
    this.drinks = [];
    this.route.url
    .subscribe(urlSeg => {
      const url = urlSeg[0].path;
      switch (url) {
        case 'my':
          this.drinksService.getMyDrinks(this.page, this.pageSize).subscribe(ds => this.drinks = ds); break;
        case 'created':
          this.drinksService.getCreatedDrinks(this.page, this.pageSize).subscribe(ds => this.drinks = ds); break;
        case 'api':
          this.drinksService.getAPIDrinks(this.page, this.pageSize).subscribe(ds => this.drinks = ds); break;
        case 'favorite':
          this.drinksService.getFavoriteDrinks(this.page, this.pageSize).subscribe(ds => this.drinks = ds); break;
        case 'all':
          this.drinksService.getAllDrinks(this.page, this.pageSize).subscribe(ds => this.drinks = ds); break;
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

    dRef.afterClosed().subscribe(res => {
      // actually delete drink here
      if (res) {
        this.drinksService.deleteDrink(drinkid)
          .subscribe(() => undefined);
      
        this.drinks = this.drinks.filter(d => d.id !== drinkid);
      }
    })
  }

  getTwitterLink(drinkName) {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I'm drinking a ${drinkName} with Vloeistof!`)}&url=${encodeURIComponent("https://vloeistof.herokuapp.com")}&via=chartrex`;
  }


  openPostbox(drink: Drink) {
    const dRef = this.dialog.open(PostboxComponent, {
      width: '1000px',
      data: {
        drink
      }
    })

  }

  pageForward() {
    this.page++;
    // etc
    this.getDrinks();
  }

  pageBackward() {
    if (this.page === 0) {
      return;
    }
    this.page--;
    //
    this.getDrinks();
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