import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DrinksService } from '../../drinks.service';
import { Drink } from 'src/app/types';

@Component({
  selector: 'app-drinkslist',
  templateUrl: './drinkslist.component.html',
  styleUrls: ['./drinkslist.component.scss']
})
export class DrinksListComponent implements OnInit {

  drinks: Drink[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private drinksService: DrinksService) { }

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




}
